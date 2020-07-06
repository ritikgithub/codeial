const mongoose = require('mongoose');
const friendship_schema = new mongoose.Schema({
    me: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    other: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Friendship = mongoose.model('Friendship',friendship_schema);
module.exports = Friendship;