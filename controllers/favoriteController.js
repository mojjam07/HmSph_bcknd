const { User, Listing } = require('../models/model1');

const getFavorites = async (req, res, next) => {
  try {
    // Get user with saved listings
    const user = await User.findOne({ 
      where: { userId: req.user.id },
      attributes: ['savedListings']
    });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Handle case where savedListings might be null
    const savedListings = user.savedListings || [];
    
    // Get favorite listings
    const favoriteListings = await Listing.findAll({
      where: {
        listingId: savedListings,
        status: 'active'
      },
      attributes: ['listingId', 'title', 'description', 'propertyType', 'location', 'price', 'features', 'images', 'status']
    });
    
    res.json({
      success: true,
      data: favoriteListings.map(listing => ({
        propertyId: listing.listingId,
        listing: listing
      }))
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    
    if (!propertyId) {
      return res.status(400).json({ success: false, message: 'Property ID is required' });
    }
    
    // Check if property exists
    const property = await Listing.findOne({ 
      where: { 
        listingId: propertyId,
        status: 'active' 
      } 
    });
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    // Get user
    let user = await User.findOne({ where: { userId: req.user.id } });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Initialize savedListings if it doesn't exist
    if (!user.savedListings) {
      user.savedListings = [];
    }
    
    // Add property to favorites if not already there
    if (!user.savedListings.includes(propertyId)) {
      user.savedListings.push(propertyId);
      await user.save();
    }
    
    res.json({
      success: true,
      message: 'Property added to favorites',
      data: { propertyId }
    });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    
    if (!propertyId) {
      return res.status(400).json({ success: false, message: 'Property ID is required' });
    }
    
    // Get user
    let user = await User.findOne({ where: { userId: req.user.id } });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Remove property from favorites if it exists
    if (user.savedListings && user.savedListings.includes(propertyId)) {
      user.savedListings = user.savedListings.filter(id => id !== propertyId);
      await user.save();
    }
    
    res.json({
      success: true,
      message: 'Property removed from favorites',
      data: { propertyId }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
