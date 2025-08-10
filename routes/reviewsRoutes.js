// routes/reviewsRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET /api/reviews - Get all reviews
router.get('/', reviewController.getReviews);

// GET /api/reviews/property/:propertyId - Get reviews for a specific property
router.get('/property/:propertyId', reviewController.getPropertyReviews);

// GET /api/reviews/agent/:agentId - Get reviews for a specific agent
router.get('/agent/:agentId', reviewController.getAgentReviews);

// GET /api/reviews/user/:userId - Get reviews by a specific user
router.get('/user/:userId', reviewController.getUserReviews);

// GET /api/reviews/stats - Get review statistics
router.get('/stats', reviewController.getReviewStats);

// GET /api/reviews/:id - Get a specific review by ID
router.get('/:id', reviewController.getReviewById);

// GET /api/reviews/health - Health check endpoint
router.get('/health', reviewController.healthCheck);

// POST /api/reviews - Create a new review
router.post('/', authenticateToken, reviewController.createReview);

// POST /api/reviews/:id/like - Like a review
router.post('/:id/like', authenticateToken, reviewController.likeReview);

// POST /api/reviews/:id/dislike - Dislike a review
router.post('/:id/dislike', authenticateToken, reviewController.dislikeReview);

// PUT /api/reviews/:id - Update a review (if needed)
router.put('/:id', authenticateToken, reviewController.updateReview);

// DELETE /api/reviews/:id - Delete a review (if needed)
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
