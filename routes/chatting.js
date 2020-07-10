const express = require('express');
const router  = express.Router();
const chattingController = require('../controllers/chattingController');
const passport = require('passport');

router.get('/get-chat-box',passport.checkAuthentication,chattingController.getChatBox);


module.exports = router;