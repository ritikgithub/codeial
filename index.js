const express = require('express');
const app = express();
const port = 8000;
const db= require('./config/mongoose.js');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const middleware = require('./config/middleware');
const nodemailer = require('./config/nodemailer');
const path = require('path');
const  http = require('http').createServer(app);
const env = require('./config/environment');
const logger = require('morgan');

http.listen(5000,function(err){
    if(err){console.log("error", err);return;}
    console.log('Listening on port number 5000');
});

const chatServerConfig = require('./config/chatting_server')(http);

app.use(sassMiddleware({
    src: path.join(env.static_files_path,'scss'),
    dest: path.join(env.static_files_path,'css'),
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(cookieParser());
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(express.static(env.static_files_path));
app.use('/uploads',express.static('./uploads'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (100*60*1000)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(middleware.customMware);

app.use(logger(env.morgan.mode, {stream: env.morgan.stream}));
app.use('/',require('./routes'));

app.listen(port,function(err) {
    if(err)
    {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});


