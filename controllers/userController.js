const User = require('../models/user.js');

module.exports.profile = function(req,res){
    // console.log(req.cookies.user_id);
    // if(!req.cookies.user_id){
    //     return res.redirect('/users/sign-in');
    // }
    User.findById(req.cookies.user_id,function(err,user){
        if(err){console.log("Cant find user profile"); return;}
        if(!user){
            return res.redirect('/users/sign-in');
        }
        let name = user.name;
        return res.render('user_profile',{
            title:"user-profile",
            name: name
         });
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

    let email= req.body.email;
    let password = req.body.password;

    User.findOne({email:email , password:password},function(err,user){
        if(err){console.log("Error in showing the user"); return;}
        if(!user){
            console.log("Not Registered yet");
            return res.redirect('back');
        }
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');
    });

};

module.exports.signOut = function(req,res){

    res.clearCookie('user_id');
    return res.redirect('/');


};