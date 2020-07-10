const mongoose = require('mongoose');
const multer = require('multer');
const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    img_path: {
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/posts')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

postSchema.statics.postUpload = multer({storage:storage}).single('postImage');


const Post = mongoose.model('Post',postSchema);

module.exports = Post;