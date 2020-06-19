const nodemailer = require('../config/nodemailer');

module.exports.forgotPasswordEmail = function(forgotLink,email){
    let htmlString = nodemailer.renderTemplate({forgotLink: forgotLink} , '/forgot_password.ejs')
    nodemailer.transporter.sendMail({
        from: "abdimaagmat@gmail.com",
        to: email,
        subject: "Reset Password Link",
        html: htmlString
    },function(err,info){
        if(err){console.log(err);return;}
        console.log(info);
    });
}