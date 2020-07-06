const Friend_request = require('../models/friend_request');
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.accept = async function(req,res){
    let friend_request = await Friend_request.findOne({sender: req.query.sender_id , receiver: req.user.id});
    friend_request.remove();

    req.user.friends.push(req.query.sender_id);
    req.user.save();

    let sender = await User.findById(req.query.sender_id);
    sender.friends.push(req.user._id);
    sender.save();

   await  Friendship.create({
        me: req.query.sender_id,
        other: req.user._id
    });

    await Friendship.create({
        me: req.user._id,
        other: req.query.sender_id
    });

    return res.redirect('back');

}

module.exports.reject = async function(req,res){
    let friend_request = await Friend_request.findOne({sender: req.query.sender_id , receiver: req.user._id});
    friend_request.remove();

    return res.redirect('back');
}

module.exports.send = async function(req,res){
    console.log('hoooo');
    console.log(req.query.profile_user_id);
       await Friend_request.create({
           sender: req.user._id,
           receiver: req.query.profile_user_id
       });

       return res.redirect('back');
}