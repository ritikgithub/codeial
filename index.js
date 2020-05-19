const express = require('express');
const app = express();
const port = 8000;

const db= require('./config/mongoose.js');

const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded());

app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/',require('./routes'));



app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port,function(err) {
    if(err)
    {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});

