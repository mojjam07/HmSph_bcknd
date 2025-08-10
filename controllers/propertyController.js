const { Listing } = require('../models/model1');
const { Op } = require('sequelize');

const getListings = async (req, res, next) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    
    // Extract filter parameters
    const { propertyType, priceRange, search } = req.query;
    
    // Build where conditions
    const whereConditions = { status: 'active' };
    
    if (propertyType && propertyType !== 'all') {
      whereConditions.propertyType = propertyType;
    }
    
    // For price range filtering, we would need to implement based on your price structure
    // This is a simplified example assuming price is stored as a number
    if (priceRange && priceRange !== 'all') {
      // Parse price range (e.g., "0-100000", "100000-200000", "200000+")
      const [min, max] = priceRange.split('-');
      if (min && max) {
        // Add price filtering logic based on your data structure
        // whereConditions.price = { [Op.between]: [parseInt(min), parseInt(max)] };
      } else if (min && priceRange.endsWith('+')) {
        // whereConditions.price = { [Op.gte]: parseInt(min) };
      }
    }
    
    // For search, we would need to implement based on your search requirements
    // This is a simplified example
    if (search) {
      // Add search logic based on your data structure
      whereConditions[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { propertyType: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    // Fetch listings with pagination
    const { count, rows: listings } = await Listing.findAndCountAll({
      where: whereConditions,
      attributes: ['listingId', 'title', 'description', 'propertyType', 'location', 'price', 'features', 'images', 'status'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    
    // Calculate if there are more pages
    const hasMore = page * limit < count;
    
    res.json({
      success: true,
      data: listings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalListings: count,
        hasMore
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findOne({
      where: { 
        listingId: id,
        status: 'active' 
      },
      attributes: ['listingId', 'title', 'description', 'propertyType', 'location', 'price', 'features', 'images', 'videos', 'status']
    });
    
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

const searchProperties = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }
    
    const listings = await Listing.findAll({
      where: {
        status: 'active',
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
          { propertyType: { [Op.iLike]: `%${q}%` } }
        ]
      },
      attributes: ['listingId', 'title', 'description', 'propertyType', 'location', 'price', 'features', 'images', 'status']
    });
    
    res.json({ success: true, data: listings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getListings, getProperty, searchProperties };
