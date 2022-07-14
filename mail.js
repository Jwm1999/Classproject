const nodemailer = require('nodemailer');



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
    const sendMail = (emailaddress) => {
        let mailOptions = {
            from: "jackmingsschool@gmail.com",
            to: emailaddress,
            subject: "Jack Mings Project",
            text: "Dear User, Thank you for your feedback! - From JackMings@https://jackmingsproject-app.herokuapp.com/",
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
