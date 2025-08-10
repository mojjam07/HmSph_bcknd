const { Agent } = require('../models/model1');
const { Op, Sequelize } = require('sequelize');

const getAgents = async (req, res, next) => {
  try {
    const { search, location, specialty } = req.query;

    // Build where conditions
    const whereConditions = {};

    if (search) {
      whereConditions[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (location && location !== 'all') {
      whereConditions.location = location;
    }
    if (specialty && specialty !== 'all') {
      whereConditions.specialties = { [Op.contains]: [specialty] };
    }

    const agents = await Agent.findAll({
      where: whereConditions,
      attributes: [
        'agentId',
        'firstName',
        'lastName',
        'businessName',
        'profilePicture',
        'businessAddress',
        'licenseNumber',
        'isVerified',
        'verificationStatus',
        'subscriptionPlan',
        'subscriptionStatus',
        'yearsOfExperience'
      ]
    });

    res.json({ success: true, data: agents });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAgents };
