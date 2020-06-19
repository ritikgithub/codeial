const mongoose = require('mongoose');
const userTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isValid : {
        type: Boolean,
        required: true
    }
});

const UserToken = mongoose.model('UserToken',userTokenSchema);

module.exports = UserToken;