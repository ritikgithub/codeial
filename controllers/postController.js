const Post = require('../models/post.js');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    console.log("New post added");
    return res.redirect('/');
}
catch{
    console.log("Error in creating post ",err);
}
   
}

module.exports.delete = async function(req,res){
    try{
    let postId = req.query.postId;
     let post = await Post.findById(postId);
     if(post){
        if(post.user != req.user.id){
            console.log("You are not authorised to delete this");
            return res.redirect('back');
        }
        post.remove();
        let comments = await Comment.deleteMany({post:post._id});
        return res.redirect('back');
    }    
    }
    catch(err){
        console.log("Error in deleting the post",err);
    }
}