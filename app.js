// Imports
const express = require('express')
const app = express()
const port = process.env.PORT


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
  
