const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: "261878838975-3b2rqkra5c6mgnvil12km3ac8g1pnpjt.apps.googleusercontent.com",
    clientSecret: "ELO-Y6h87-wReFiSeTTCUyps",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
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