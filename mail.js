const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jackmingsschool@gmail.com",
        pass: "jizz bbdn uzvf pcgq",
    },
    tls: {
        rejectUnauthorized: false,
    },
    });

    transporter.use('compile', hbs({
        viewEngine:{
            partialsDir:"./views/",
            defaultLayout:""
        },
        viewPath:"./views/",
        extName:".hbs"
   }));




    const sendMail = (emailaddress, firstname, count, cb) => {
        let mailOptions = {
            from: "jackmingsschool@gmail.com",
            to: emailaddress,
            subject: "Jack Mings Project",
            template: 'FeedBackMessage',
            context: {
                count: count,
                text: 'Dear ' + (firstname) +', Thank you for your feedback! - From Jackmingsschool@https://jackmingsproject-app.herokuapp.com/'
            }
        };

        transporter.sendMail(mailOptions, function(err, success){
            if(err) {
                console.log(err)
            } else {
                console.log("Email sent successfully!")
            }
        });

}

module.exports = sendMail;