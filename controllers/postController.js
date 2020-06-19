const Post = require('../models/post.js');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    let populatedPost  = await Post.findById(post.id).populate('user','name');
    
    if (req.xhr) {
        return res.json({
           data: {
               post:populatedPost
           },
           message: "Post created!"
        });
    }
    
    
    req.flash('success','Post Published');
    return res.redirect('/');
}
catch(err){
    console.log(err);
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
        await Like.deleteMany({onModel:'Post' , likeable: post._id});
        await Like.deleteMany({likeable: {$in: post.comments}});

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    postId: postId
                },
                message: "Post deleted"
             });
        }


        
        req.flash('success','Post deleted');
        return res.redirect('back');
    }    
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.addOrRemoveLike = async function(req,res){

    if(req.user) {
    
    let postId = req.query.postId;

    let like = await Like.findOne({onModel: 'Post' , user : req.user.id , likeable : postId});
    
    let post  = await Post.findById(postId).populate('likes');
    
    if( !like ) {
        let newLike = await Like.create({
            user: req.user._id,
            onModel: 'Post',
            likeable: postId
        });
      
        post.likes.push(newLike._id);
        post.save();
        
    }

    else {
        like.remove();
        post.likes.pull(like._id);
        post.save();
        
    }

    
    
    if(req.xhr){
    return res.json(200,{
        data: {
            post: post
        },
        message: "Post Like successfully updated"
    });
    }

    }

}