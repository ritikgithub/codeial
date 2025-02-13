const Post = require('../../../models/post');
const Comment = require('../../../models/comment')

module.exports.index = async function(req,res){
    let posts = await Post.find({})
                .sort('-createdAt')
                .populate('user')
                .populate({path:'comments',populate:{path:'user' , select: '-password'},options: { sort: '-createdAt'}});

    return res.json(200,{
        data:{
            posts:posts
        },
        message:"Posts successfully retrieved"
    });
}

module.exports.delete = async function(req,res){
    try{
        
    let postId = req.query.postId;
   
     let post = await Post.findById(postId);
     
     if(post){
        if(post.user != req.user.id){
            return res.json({
                message:"Unauthorized to delete this post"
            });
        }
        post.remove();
        let comments = await Comment.deleteMany({post:post._id});
        return res.json(200,{
            message:"Post Deleted"
        });
    }    
    }
    catch(err){
        // req.flash('error',err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}