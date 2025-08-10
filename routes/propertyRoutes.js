const express = require('express');
const router = express.Router();
const { getListings, getProperty, searchProperties } = require('../controllers/propertyController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getListings);
router.get('/search', searchProperties);
router.get('/:id', getProperty);

module.exports = router;
