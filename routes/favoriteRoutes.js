const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getFavorites);
router.post('/', authenticateToken, addFavorite);
router.delete('/:propertyId', authenticateToken, removeFavorite);

module.exports = router;
