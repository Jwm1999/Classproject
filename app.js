// Imports
const express = require('express');
const sendMail = require('./mail');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require('mongodb');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://Jwm12:Mings100@projectcluster.vmljqtj.mongodb.net/FeedbackData", { useNewUrlParser: true}, { useUnifiedTopology: true });


//create data schema
const feedbacksSchema = {
    emailaddress: String,
    firstname: String,
    lastname: String,
    phone: String,
    commentsection: String,
    address: String
}

const feedbacks = mongoose.model("feedbacks", feedbacksSchema);

app.use(bodyParser.urlencoded({extended: true}));

//Data Parsing
app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());


app.post('/', async (req, res) => {

    let newFeedbacks = new feedbacks({
        emailaddress: req.body.emailaddress,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phonenumber,
        commentsection: req.body.commentsection,
        address: req.body.address
    });
    await newFeedbacks.save();
    res.redirect('/FeedBackForm');
        
    //send email
        console.log('Data: ', req.body);

        feedbacks.countDocuments(function(err, count) {
            if (err) return handleError(err);
            console.log(count);
            sendMail(req.body.emailaddress, req.body.firstname, count, function(err, data){
                if (err) {
                    res.status(500).json({ message: 'Internal Error'});
                } else {
                    res.json({ message: 'Email sent!!!'});
                }
            });
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
  