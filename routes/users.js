const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const User = require('../models/user');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);

//can also be done in controller
router.get('/sign-in', function(req,res,next){
    if(req.isAuthenticated()){
        console.log("User already signed-in");
        return res.redirect('/users/profile/'+req.user.id);
    }
    next();
},userController.signIn);

router.get('/sign-up', function(req,res,next){
    if(req.isAuthenticated()){
        console.log("User already signed-in");
        return res.redirect('/users/profile/'+req.user.id);
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

router.post('/update',passport.checkAuthentication,function(req,res,next){

    User.uploadAvatar(req,res,function(err){
        if(err){
            console.log("Multer Errro",err);
            return;
        }
        next();
    });
},userController.update);

router.get('/auth/google',passport.authenticate('google',{ 
    scope: ['profile','email']
}));

router.get('/auth/google/callback', passport.authenticate('google',{
    failureRedirect: '/users/sign-in'
}),userController.login);


router.post('/forgot-password',userController.forgotPassword);

//it is to get the form to change password
router.get('/reset-password',userController.resetPassword);

//it is to change password by submiting the form
router.post('/change-password',userController.changePassword);

module.exports = router;