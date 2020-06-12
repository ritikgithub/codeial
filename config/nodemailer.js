const nodemailer = require('nodemailer');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: "abdimaagmat@gmail.com",
        pass: "mujekyapata"
    }
});

let renderTemplate = function(data,relativePath){
    let htmlString;
    ejs.renderFile('./views/mailers'+relativePath,data,function(err,mailString){
        if(err){console.log("error in rendering ",err); return;}
        htmlString = mailString;
    });
    return htmlString;
}



module.exports = {
    transporter : transporter,
    renderTemplate: renderTemplate
}