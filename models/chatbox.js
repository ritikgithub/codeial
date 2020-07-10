const mongoose = require('mongoose');
const chatbox_schema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Chatbox = mongoose.model('Chatbox',chatbox_schema);
module.exports = Chatbox;