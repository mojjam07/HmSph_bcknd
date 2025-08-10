// This file contains all model associations to fix the Sequelize relationship issues

const { User, Agent, Listing, Lead, Review, Payment, Report, Admin } = require('./model1');

// Define all model associations
function setupAssociations() {
  // User associations
  User.hasMany(Review, {
    foreignKey: 'userId',
    as: 'reviews'
  });
  
  User.hasMany(Lead, {
    foreignKey: 'userId',
    as: 'leads'
  });
  
  User.hasMany(Report, {
    foreignKey: 'reporterId',
    as: 'reports'
  });

  // Agent associations
  Agent.hasMany(Listing, {
    foreignKey: 'agentId',
    as: 'listings'
  });
  
  Agent.hasMany(Review, {
    foreignKey: 'agentId',
    as: 'reviews'
  });
  
  Agent.hasMany(Lead, {
    foreignKey: 'agentId',
    as: 'leads'
  });
  
  Agent.hasMany(Payment, {
    foreignKey: 'agentId',
    as: 'payments'
  });

  // Listing associations
  Listing.belongsTo(Agent, {
    foreignKey: 'agentId',
    as: 'agent'
  });
  
  Listing.hasMany(Review, {
    foreignKey: 'listingId',
    as: 'reviews'
  });
  
  Listing.hasMany(Lead, {
    foreignKey: 'listingId',
    as: 'leads'
  });
  
  Listing.hasMany(Report, {
    foreignKey: 'listingId',
    as: 'reports'
  });

  // Review associations
  Review.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
  
  Review.belongsTo(Agent, {
    foreignKey: 'agentId',
    as: 'agent'
  });
  
  Review.belongsTo(Listing, {
    foreignKey: 'listingId',
    as: 'listing'
  });

  // Lead associations
  Lead.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
  
  Lead.belongsTo(Agent, {
    foreignKey: 'agentId',
    as: 'agent'
  });
  
  Lead.belongsTo(Listing, {
    foreignKey: 'listingId',
    as: 'listing'
  });

  // Payment associations
  Payment.belongsTo(Agent, {
    foreignKey: 'agentId',
    as: 'agent'
  });

  // Report associations
  Report.belongsTo(User, {
    foreignKey: 'reporterId',
    as: 'reporter'
  });
  
  Report.belongsTo(Listing, {
    foreignKey: 'listingId',
    as: 'listing'
  });
  
  Report.belongsTo(Admin, {
    foreignKey: 'resolvedById',
    as: 'resolvedBy'
  });

  // Admin associations
  Admin.hasMany(Report, {
    foreignKey: 'resolvedById',
    as: 'resolvedReports'
  });
}

module.exports = { setupAssociations };
