const express = require('express');
const router = express.Router();
const { registerUser, registerAgent, login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register/user', registerUser);
router.post('/register/agent', registerAgent);
router.post('/login', login);

router.get('/profile', authenticateToken, getProfile);

module.exports = router;