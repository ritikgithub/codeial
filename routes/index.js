const express = require('express');
const router  = express.Router();


router.get('/',require('../controllers/homeController').home);

router.use('/users',require('./users.js'));

router.use('/posts',require('./posts'));

module.exports = router;
