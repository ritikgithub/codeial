const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
router.get('/profile',user.profile);

router.get('/sign-in',user.signIn);

router.get('/sign-up',user.signUp);

router.post('/create',user.create);

router.post('/login',user.login);

router.get('/signOut',user.signOut);

module.exports = router;