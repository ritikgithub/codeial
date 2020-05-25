const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
   let post = await Post.findById(req.body.postId);
    let comment =   await Comment.create({
            content: req.body.comment,
            post: req.body.postId, 
            user: req.user._id
         });
    console.log("Comment Added");
    post.comments.push(comment);
    post.save();
    return res.redirect('back');
        }
    catch(err){
        console.log("Error in creating comment",err);
    }
}

module.exports.delete = function(req,res){
    let commentId = req.params.id;
    try{
    let comment = Comment.findById(commentId).populate('post').exec();
     if(comment){
        if(comment.user==req.user.id || comment.post.user == req.user.id){
            comment.remove();
            let post = Post.findByIdAndUpdate(comment.post,{ $pull :{comments:commentId} });
            return res.redirect('back');
        }
        else{
            console.log("You are not authorized to delete this comment");
            return res.redirect('back');
        }
    }
    }
    catch(err){
        console.log("Error in deleting the comment ",err);
    }
           
        
}




