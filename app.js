// Imports
const express = require('express')
const app = express()
const port = process.env.PORT


//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

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
    res.render('Workexperience')
})

app.get('/Schedule', (req, res) => {
    res.render('Schedule')
})

app.get('/FeedBackForm', (req, res) => {
    res.render('FeedbackForm')
})

// Listen on the port
app.listen(port, () => console.info('Listening on port ' + port))
  
