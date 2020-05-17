const express = require('express');
const router = express.Router();

router.get('/profile',require('../controllers/userController').profile);

module.exports = router;