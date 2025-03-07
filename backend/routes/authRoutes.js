const express = require('express');
const { signup, login, storeUserInfo } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');  

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/user', authMiddleware, storeUserInfo);  

module.exports = router;
