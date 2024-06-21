// routes/auth_routes.js
const express = require('express');
const authController = require('../controller/auth')

const router = express.Router();

// Post Pages
router.post('/client_login', authController.login);

// Get Pages
router.get('/logout', authController.logout);

module.exports = router;