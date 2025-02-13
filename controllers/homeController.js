const User = require('../models/user');
const Post = require('../models/post');
const Chat_message = require('../models/chat_message');
const env = require('../config/environment');


module.exports.home = async function(req,res){
    try{
    let posts;
    if(req.user){
     posts = await Post.find({$or:[{user : req.user._id}, {user: { $in:req.user.friends }}]})
       .sort('-createdAt')
       .populate('user')
       .populate('likes')
       .populate({path:'comments',populate:[{path:'user'},{path:'likes'}],options: { sort: '-createdAt'}});
    }
    let populate_user;
    if(req.user)
        populate_user = await User.findById(req.user._id).populate('friends');
    let users = await User.find({});
    let chat_messages = await Chat_message.find({}).populate('user');
    
    
   
    return res.render('home',{
        title: "codeial | home",
        posts:posts,
        users: users,
        chat_messages:chat_messages,
        env_name : env.name,
        populate_user:populate_user
    });
}
    catch(err)
    {
        console.log(err);
        req.flash('error',err);
        return res.redirect('back');
    }
}