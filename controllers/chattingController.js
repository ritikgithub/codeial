const Chatbox = require('../models/chatbox');
const Chat_message = require('../models/chat_message');

module.exports.getChatBox = async function(req,res){
    let chatbox  =await Chatbox.findOne({$or:[{user1:req.query.sender, user2: req.query.receiver},{user1:req.query.receiver, user2: req.query.sender}]});
    let chat_messages;
    if(chatbox){
         chat_messages = await Chat_message.find({chatbox:chatbox._id}).populate('sender');
    }
    else {
        chatbox = await Chatbox.create({
            user1: req.query.sender,
            user2: req.query.receiver
        });
    }
    return res.json({
        data: {
            chatbox: chatbox,
            chat_messages: chat_messages
        }
    });


};