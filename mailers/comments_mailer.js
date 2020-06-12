const nodemailer = require('../config/nodemailer');

module.exports.newComment = function(comment){
    console.log(comment);
    let htmlString = nodemailer.renderTemplate({comment: comment} , '/comment/newComment.ejs' )
    nodemailer.transporter.sendMail({
        from: "abdimaagmat@gmail.com",
        to: comment.user.email,
        subject: "hello",
        html: htmlString
    },function(err,info){
        if(err){console.log(err);return;}
        console.log(info);
    });
}