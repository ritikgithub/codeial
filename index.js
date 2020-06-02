const express = require('express');
const app = express();
const port = 8000;
const db= require('./config/mongoose.js');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const middleware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(cookieParser());
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/uploads',express.static('./uploads'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
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

app.use('/',require('./routes'));

app.listen(port,function(err) {
    if(err)
    {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});

