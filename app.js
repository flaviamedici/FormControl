const express = require('express');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const path = require('path');
const nodemailer = require ('nodemailer');

const app = express();


// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Body parser middleware @github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
res.render('contact');
});

app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    
    'use strict';
    const nodemailer = require('nodemailer');
    
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'mail.flaviamedici.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'me@flaviamedici.com', // generated ethereal user
                    pass: '123456789' // generated ethereal password
                },
                tls:{
                    rejectUnauthorized:false
                }
            });
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Nodemailer Contact" <me@flaviamedici.com>', // sender address
                to: 'flamedici@hotmail.com', // list of receivers
                subject: 'Node contact request', // Subject line
                text: 'Hello world', // plain text body
                html: output // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg: "Email has been sent"})
            });
        });
});

app.listen(3000, () => console.log('Server started...'));