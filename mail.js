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
            text: "Hopefully you got this!",
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