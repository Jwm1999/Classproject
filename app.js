// Imports
const express = require('express');
const sendMail = require('./mail');
const app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;


//Chunk 2
//Data Parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.post('/email', (req, res) => {

        //send email
        const { emailaddress } = req.body;
        console.log('Data: ', req.body);

        sendMail(emailaddress, function(err, data){
            if (err) {
                res.status(500).json({ message: 'Internal Error'});
            } else {
                res.json({ message: 'Email sent!!!'});
            }
        });
});


//Static Files
app.use(express.static('Public'))
app.use('/css', express.static(__dirname + 'Public/css'))
app.use('/js', express.static(__dirname + 'Public/js'))
app.use('/img', express.static(__dirname + 'Public/img'))




// Set Views
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('Index')
})

app.get('/EducationHistory', (req, res) => {
    res.render('EducationHistory')
})

app.get('/Index', (req, res) => {
    res.render('Index')
})

app.get('/WorkExperience', (req, res) => {
    res.render('WorkExperience')
})

app.get('/Schedule', (req, res) => {
    res.render('Schedule')
})

app.get('/FeedBackForm', (req, res) => {
    res.render('FeedbackForm')
})

// Listen on the port
app.listen(port, () => console.info('Listening on port ' + port))
  