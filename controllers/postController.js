const Post = require('../models/post.js');

module.exports.create = function(req,res){
    
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("Error");
            return;
        }
        console.log("New post added");
        return res.redirect('/');
    });
   
}