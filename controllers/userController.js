const User = require('../models/user.js');
const path = require('path');
const fs = require('fs');

module.exports.profile = async function(req,res){
    console.log(req.params.id);
    try{
    let user = await User.findById(req.params.id);
    return res.render('user_profile',{
        title: 'user-profile',
        profile_user: user
    });
    }
    catch(err){
       req.flash('error',err);
       return res.redirect('back');
    }
   
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

module.exports.create  = async function(req,res){
    try{
    if(req.body.password!=req.body.confirm_password)
    {
        req.flash('error',"passwords should be same");
        return res.redirect('back');
    }
    
    let user = await User.findOne({email:req.body.email});
    if(user)
    {
        req.flash('error',"User cant be added due to same email");
        return res.redirect('back');
    }
    let newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        name:req.body.name
    });
    req.flash('success',"User Added");
    return res.redirect('/users/sign-in');
    }
    catch(err){
        req.flash('error',err);
        res.redirect('back');
    }
}

module.exports.login = function(req,res){

    req.flash('success',"You have successfully Logged in");
    return res.redirect("/users/profile/"+req.user.id);
};

module.exports.signOut = function(req,res){
    req.logout();
    req.flash('success',"You have logged out");
    return res.redirect('/users/sign-in');
};

module.exports.update = async function(req,res){
    try{
    if(req.body.userId == req.user.id){
        let user = await User.findByIdAndUpdate(req.body.userId,{name:req.body.name,email:req.body.email});
        if(req.file){

            

            if(user.avatar && fs.existsSync(path.join(__dirname,'..', user.avatar))){
                fs.unlinkSync(path.join(__dirname,'..', user.avatar));
            }

            user.avatar = User.avatarPath + '/' + req.file.filename;
            user.save();
        }


        return res.redirect('back');
    }
    else
      return res.status(401).send("Not authoized");
}
catch(err){
    console.log("Error in updating the user ",err);
}
    

}