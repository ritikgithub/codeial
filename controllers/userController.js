const User = require('../models/user.js');

module.exports.profile = function(req,res){
    console.log(req.params.id);
    User.findById(req.params.id,function(err,user){
        if(err){console.log("Error in finding profile");return;}
        return res.render('user_profile',{
            title: 'user-profile',
            profile_user: user
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
    console.log(req.user.id,"#####");
    return res.redirect("/users/profile/"+req.user.id);
};

module.exports.signOut = function(req,res){
    req.logout();
    return res.redirect('/users/sign-in');
};

module.exports.update = function(req,res){
    if(req.body.userId == req.user.id){
        User.findByIdAndUpdate(req.body.userId,{name:req.body.name,email:req.body.email},function(err,user){
            if(err){console.log("Cant update user");return;}
            return res.redirect('back');
        });
    }
    else
      return res.status(401).send("Not authoized");
    

}