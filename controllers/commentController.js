const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const jobs = require('../config/kue');
const commentEmailWorker = require('../workers/comment_emails_workers');

module.exports.create = async function(req,res){
    try{
   let post = await Post.findById(req.body.postId);
    let comment =  await  Comment.create({
            content: req.body.comment,
            post: req.body.postId, 
            user: req.user._id
         });
    console.log("Comment Added");
    post.comments.push(comment);
    post.save();
    let populatedComment = await Comment.findById(comment.id).populate('user','name email');
    
    let job = jobs.createJob('emails', populatedComment) .save(function(err){
        if(err){console.log("Error in creaing job ",err); return;}
        console.log(job.id);
    });
    // commentsMailer.newComment(populatedComment);
    
    if(req.xhr){
    return res.status(200).json({
        data: {
            comment: populatedComment
        },
        message: "Comment Created"
    });
}

    req.flash('success','Comment created');
    return res.redirect('back');
        }
    catch(err){
       req.flash('error',err);
       return res.redirect('back');
    }
}

module.exports.delete = async function(req,res){
    let commentId = req.params.id;
    try{
    let comment = await Comment.findById(commentId).populate('post').exec();
     if(comment){
        if(comment.user==req.user.id  || comment.post.user == req.user.id){
            comment.remove();
            let post = await Post.findByIdAndUpdate(comment.post,{ $pull :{comments:commentId} });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        commentId: commentId
                    },
                    message: "Comment Deleted"
                });
            }

            req.flash('success','Comment deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','Not authorized to delete this comment');
            return res.redirect('back');
        }
    }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}




