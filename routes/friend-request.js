const express = require('express');
const router  = express.Router();
const friendRequestController = require('../controllers/friendRequestController');

router.get('/send',friendRequestController.send);
router.get('/accept',friendRequestController.accept);
router.get('/reject',friendRequestController.reject);

module.exports = router;