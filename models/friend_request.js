const mongoose = require('mongoose');
const friend_request_schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Friend_request = mongoose.model('Friend_request',friend_request_schema);
module.exports = Friend_request;