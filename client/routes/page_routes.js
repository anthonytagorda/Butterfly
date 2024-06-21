// page_routes.js
const express = require('express');

const router = express.Router();

router.get(['/', '/user_login'], authController.isLoggedIn, authController.login);