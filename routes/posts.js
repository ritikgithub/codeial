const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/postController');
const Post = require('../models/post');

router.post('/create',passport.checkAuthentication,Post.postUpload,postController.create);

router.get('/add-delete-like',passport.checkAuthentication,postController.addOrRemoveLike);

router.get('/delete',passport.checkAuthentication,postController.delete);

module.exports = router;