const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.postId,function(err,post){
        if(err){console.log("Error in finding post");return}
        Comment.create({
            content: req.body.comment,
            post: req.body.postId, 
            user: req.user._id
         },function(err,comment){
             if(err){console.log("Error in adding comment");return;}
             console.log("Comment Added");
             post.comments.push(comment);
             post.save();
             return res.redirect('back');
         });
    });
}

module.exports.delete = function(req,res){
    
    let commentId = req.params.id;
    Comment.findById(commentId).populate('post').exec(function(err,comment){
        if(err){console.log("Error in deleting the comment"); return;}
        if(comment){
            if(comment.user==req.user.id || comment.post.user == req.user.id){
                comment.remove();
                Post.findByIdAndUpdate(comment.post,{ $pull :{comments:commentId} },function(err,post){
                    return res.redirect('back');
                });
                //second Method 
            //    let commentsArray = comment.post.comments;
            //     let commentIndex = commentsArray.indexOf(comment._id);
            //     commentsArray.splice(commentIndex,1);
            //     comment.post.save();
            //     return res.redirect('back');
            }
            else{
                console.log("You are not authorized to delete this comment");
                return res.redirect('back');
            }
        }
    });


}

