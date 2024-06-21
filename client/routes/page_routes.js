// routes/page_routes.js
const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

// Page Routes
router.get(['/', '/client_login'], authController.isLoggedIn, authController.login);

module.exports = router;