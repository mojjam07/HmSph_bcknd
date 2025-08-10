const { body, validationResult } = require('express-validator');

// Validation rules for review creation
const validateReview = [
  body('type')
    .isIn(['property', 'agent'])
    .withMessage('Type must be either "property" or "agent"'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('title')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('content')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Content must be between 10 and 1000 characters'),
  body('propertyId')
    .optional()
    .isInt()
    .withMessage('Property ID must be a valid integer'),
  body('agentId')
    .optional()
    .isInt()
    .withMessage('Agent ID must be a valid integer')
];

// Validation rules for pagination
const validatePagination = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateReview,
  validatePagination,
  handleValidationErrors
};
