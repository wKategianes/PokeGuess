const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Add a new route to update the user's score
router.post('/score', userController.updateScore);

module.exports = router;