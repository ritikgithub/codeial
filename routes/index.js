const express = require('express');
const router  = express.Router();


router.get('/',require('../controllers/homeController').home);

router.use('/users',require('./users.js'));




module.exports = router;


console.log("successs");