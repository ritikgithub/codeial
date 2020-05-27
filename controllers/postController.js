const Post = require('../models/post.js');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    
    req.flash('success','Post Published');
    return res.redirect('/');
}
catch(err){
    req.flash('error',err);
    return res.redirect('back');
}
   
}

module.exports.delete = async function(req,res){
    try{
    let postId = req.query.postId;
     let post = await Post.findById(postId);
     if(post){
        if(post.user != req.user.id){
            req.flash('error','You are not authorized to delete the post');
            return res.redirect('back');
        }
        post.remove();
        let comments = await Comment.deleteMany({post:post._id});
        req.flash('success','Post deleted');
        return res.redirect('back');
    }    
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}