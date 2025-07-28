const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to login an existing user
router.post('/login', authController.loginUser);

module.exports = router;
