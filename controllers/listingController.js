const { Listing } = require('../models/model1');

const getListings = async (req, res, next) => {
  try {
    const listings = await Listing.findAll({
      where: { status: 'active' },
      attributes: ['listingId', 'title', 'description', 'propertyType', 'location', 'price', 'features', 'images', 'status']
    });
    res.json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};
module.exports = { getListings };
