const User = require('../models/user');
const Post = require('../models/post');




module.exports.home = async function(req,res){
    try{
    let posts = await Post.find({}).sort('-createdAt').populate('user').populate({path:'comments',populate:{path:'user'}});
    let users = await User.find({});
    return res.render('home',{
        title: "codeial | home",
        posts:posts,
        users: users 
    });
}
    catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
}