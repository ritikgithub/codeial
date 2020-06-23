const mongoose = require('mongoose');
const chat_message_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
});
const Chat_message = mongoose.model('Chat_message',chat_message_schema);
module.exports = Chat_message;