const { Review, User, Listing } = require('../models');

const reviewController = {
  async getReviews(req, res) {
    try {
      console.log('Fetching reviews...');
      const reviews = await Review.findAll({
        include: [
          { 
            model: User, 
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'] 
          },
          { 
            model: Listing, 
            as: 'listing',
            attributes: ['id', 'title'] 
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      console.log(`Found ${reviews.length} reviews`);
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ 
        message: 'Server error while fetching reviews',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  },

  async getPropertyReviews(req, res) {
    try {
      const { propertyId } = req.params;
      console.log(`Fetching reviews for property ${propertyId}`);
      const reviews = await Review.findAll({
        where: { listingId: propertyId },
        include: [{ 
          model: User, 
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'] 
        }],
        order: [['createdAt', 'DESC']]
      });
      console.log(`Found ${reviews.length} reviews for property ${propertyId}`);
      res.json(reviews);
    } catch (error) {
      console.error(`Error fetching reviews for property ${propertyId}:`, error);
      res.status(500).json({ 
        message: 'Server error while fetching property reviews',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  },

  async createReview(req, res) {
    try {
      const { propertyId, rating, comment } = req.body;
      const review = await Review.create({
        userId: req.user.id,
        propertyId,
        rating,
        comment
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async likeReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      await review.increment('likes');
      await review.reload();
      
      res.json({ 
        success: true, 
        likes: review.likes,
        dislikes: review.dislikes 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async dislikeReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      await review.increment('dislikes');
      await review.reload();
      
      res.json({ 
        success: true, 
        likes: review.likes,
        dislikes: review.dislikes 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAgentReviews(req, res) {
    try {
      const { agentId } = req.params;
      const reviews = await Review.findAll({
        include: [
          { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
          { 
            model: Listing, 
            attributes: ['id', 'title'],
            where: { agentId },
            required: true
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(reviews);
    } catch (error) {
      console.error(`Error fetching reviews for agent ${agentId}:`, error);
      res.status(500).json({ 
        message: 'Server error while fetching agent reviews',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  },

  async getUserReviews(req, res) {
    try {
      const { userId } = req.params;
      const reviews = await Review.findAll({
        where: { userId },
        include: [
          { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
          { model: Listing, attributes: ['id', 'title'] }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getReviewStats(req, res) {
    try {
      const stats = await Review.findAll({
        attributes: [
          [Review.sequelize.fn('AVG', Review.sequelize.col('rating')), 'averageRating'],
          [Review.sequelize.fn('COUNT', Review.sequelize.col('id')), 'totalReviews']
        ],
        raw: true
      });

      const ratingDistribution = await Review.findAll({
        attributes: [
          'rating',
          [Review.sequelize.fn('COUNT', Review.sequelize.col('id')), 'count']
        ],
        group: ['rating'],
        order: [['rating', 'DESC']],
        raw: true
      });

      res.json({
        averageRating: parseFloat(stats[0].averageRating) || 0,
        totalReviews: parseInt(stats[0].totalReviews) || 0,
        ratingDistribution
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getReviewById(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
          { model: Listing, attributes: ['id', 'title'] }
        ]
      });

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      res.json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async healthCheck(req, res) {
    try {
      const count = await Review.count();
      res.json({ 
        status: 'healthy', 
        reviewCount: count,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(500).json({ 
        status: 'unhealthy', 
        error: error.message 
      });
    }
  },

  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;

      const review = await Review.findByPk(id);
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Check if the user owns this review
      if (review.userId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this review' });
      }

      await review.update({ rating, comment });
      await review.reload({
        include: [
          { model: User, attributes: ['id', 'name', 'email'] },
          { model: Property, attributes: ['id', 'title'] }
        ]
      });

      res.json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Check if the user owns this review or is admin
      if (review.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this review' });
      }

      await review.destroy();
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = reviewController;
