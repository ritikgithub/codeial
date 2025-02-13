const passport = require('passport');
const StrategyJwt = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('./environment');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.jwt_secret;

passport.use(new StrategyJwt(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;