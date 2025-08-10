const express = require('express');
const router = express.Router();
const { getAgents } = require('../controllers/agentController');

// Public route to get agents list
router.get('/', getAgents);

module.exports = router;
