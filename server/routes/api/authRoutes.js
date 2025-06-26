const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware');
const { register, login, logout, me } = require('../../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect,logout);
router.get('/me', protect, me);

module.exports = router;