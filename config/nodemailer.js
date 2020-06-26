const nodemailer = require('nodemailer');
const ejs = require('ejs');
const env = require('./environment');
let transporter = nodemailer.createTransport(env.smtp);

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