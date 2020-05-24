const Post = require('../models/post.js');
const Comment = require('../models/comment');

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

module.exports.delete = function(req,res){
    let postId = req.query.postId;
    Post.findById(postId,function(err,post){
        if(err){console.log("Error in deleting the post");return}
        if(post){
            if(post.user != req.user.id){
               console.log("You are not authorised to delete this");
                return res.redirect('back');
            }
            post.remove();
            Comment.deleteMany({post:post._id},function(err){
                if(err){console.log("Error in deleting the comment of post");return}
                return res.redirect('back');
        });
    }
    });
    }
    