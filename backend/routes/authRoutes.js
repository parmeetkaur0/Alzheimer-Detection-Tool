// routes/authRoutes.js
const express = require('express');
const { signup, login, storeUserInfo } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/uid', storeUserInfo);

module.exports = router;
