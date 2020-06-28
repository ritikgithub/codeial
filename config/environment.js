const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname,'..','log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});


const development = {
    name:"development",
    static_files_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "abdimaagmat@gmail.com",
            pass: "mujekyapata"
        }
    },
    google_oauth_clientID: "261878838975-3b2rqkra5c6mgnvil12km3ac8g1pnpjt.apps.googleusercontent.com",
    google_oauth_clientSecret: "ELO-Y6h87-wReFiSeTTCUyps",
    google_oauth_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial',
    morgan:{
        mode:'dev',
        stream: accessLogStream
    }

}

const production = {
    name:"production",
    static_files_path: process.env.CODEIAL_STATIC_FILES,
    session_cookie_key: process.env.CODEIAL_SESSION_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.CODEIAL_SMTP_USER,
            pass: process.env.CODEIAL_SMTP_PASSWORD
        }
    },
    google_oauth_clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_oauth_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_oauth_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACKURL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET ,
    morgan:{
        mode:'combined',
        stream: accessLogStream
    } 

}

module.exports = process.env.NODE_ENV == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
