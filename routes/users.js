const express = require('express');
const router = express.Router();

router.get('/profile',require('../controllers/userController').profile);

router.get('/sign-in',require('../controllers/userController').signIn);

router.get('/sign-up',require('../controllers/userController').signUp);

router.post('/create',require('../controllers/userController').create);

router.post('/login',require('../controllers/userController').login);

module.exports = router;