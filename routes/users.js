const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
router.get('/profile',passport.checkAuthentication,userController.profile);

//can also be done in controller
router.get('/sign-in', function(req,res,next){
    if(req.isAuthenticated()){
        console.log("User already signed-in");
        return res.redirect('/users/profile');
    }
    next();
},userController.signIn);

router.get('/sign-up', function(req,res,next){
    if(req.isAuthenticated()){
        console.log("User already signed-in");
        return res.redirect('/users/profile');
    }
    next();
},userController.signUp);

router.post('/create',userController.create);

router.post('/login', passport.authenticate(
    'local', {
        failureRedirect : '/users/sign-in'
    }
) ,userController.login);

router.get('/sign-out',userController.signOut);

module.exports = router;