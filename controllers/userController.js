const User = require('../models/user.js');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'user-profile'
    });
};

module.exports.signIn = function(req,res){
    return res.render('sign_in',{
        title:"codeial/sign-in"
    });
};

module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        title:"codeial/sign-up"
    });
};

module.exports.create  = function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        console.log("passwords should be same")
        return res.redirect('back');
    }
    
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log("User cant be added");
            return res.redirect('back');
        }

        if(user)
        {
            console.log("User cant be added due to same email");
            return res.redirect('back');
        }
        User.create({
            email: req.body.email,
            password: req.body.password,
            name:req.body.name
        },function(err,newUser){
            if(err)
            {
                console.log("User cant be added");
                return res.redirect('back');
            }
            console.log("User Added");
            return res.redirect('/users/sign-in');
        });

});
}

module.exports.login = function(req,res){
    return res.redirect('/users/profile');
};

module.exports.signOut = function(req,res){
    req.logout();
    return res.redirect('/users/sign-in');
};

