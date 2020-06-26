const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
   clientID:  env.google_oauth_clientID,
   clientSecret: env.google_oauth_clientSecret,
   callbackURL:  env.google_oauth_callbackURL
},
function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value},function(err,user){
        if(err){console.log(err); return}
        if(user){
            return done(null,user);
        }
        if(!user){
            User.create({
                email : profile.emails[0].value,
                name: profile.displayName,
                password : crypto.createHmac('sha256', 'abcdefg')
                .update('I love cupcakes')
                .digest('hex')
            },function(err,user){
                if(err){console.log(err); return;}
                return done(null,user);
            });
            
        }
    })
}
));