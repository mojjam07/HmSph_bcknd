const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/db');

class User extends Model {
  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    },
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  preferences: {
    type: DataTypes.JSONB
  },
  savedListings: {
    type: DataTypes.ARRAY(DataTypes.INTEGER) // Assuming Listing IDs are integers
  },
  searchHistory: {
    type: DataTypes.JSONB
  },
  smsNotifications: {
    type: DataTypes.JSONB
  },
  lastLogin: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

class Agent extends Model {
  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Agent.init({
  agentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    },
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessName: {
    type: DataTypes.STRING
  },
  profilePicture: {
    type: DataTypes.STRING
  },
  businessAddress: {
    type: DataTypes.STRING
  },
  licenseNumber: {
    type: DataTypes.STRING
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  verificationDocuments: {
    type: DataTypes.JSONB
  },
  subscriptionPlan: {
    type: DataTypes.ENUM('free', 'silver', 'gold'),
    defaultValue: 'free'
  },
  subscriptionStatus: {
    type: DataTypes.ENUM('active', 'expired', 'cancelled'),
    defaultValue: 'active'
  },
  subscriptionExpiresAt: {
    type: DataTypes.DATE
  },
  listingLimits: {
    type: DataTypes.JSONB
  },
  currentMonthListings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  metrics: {
    type: DataTypes.JSONB
  },
  lastLogin: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Agent',
  timestamps: true,
  hooks: {
    beforeCreate: async (agent) => {
      if (agent.password) {
        agent.password = await bcrypt.hash(agent.password, 12);
      }
    },
    beforeUpdate: async (agent) => {
      if (agent.changed('password')) {
        agent.password = await bcrypt.hash(agent.password, 12);
      }
    }
  }
});

class Listing extends Model {}

Listing.init({
  listingId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Agents',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  propertyType: {
    type: DataTypes.ENUM('apartment', 'house', 'studio', 'duplex', 'shared_room', 'office', 'shop'),
    allowNull: false
  },
  location: {
    type: DataTypes.JSONB
  },
  price: {
    type: DataTypes.JSONB
  },
  features: {
    type: DataTypes.JSONB
  },
  images: {
    type: DataTypes.JSONB
  },
  videos: {
    type: DataTypes.JSONB
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'rented', 'pending'),
    defaultValue: 'active'
  },
  isPromoted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  promotionExpiresAt: {
    type: DataTypes.DATE
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  analytics: {
    type: DataTypes.JSONB
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationNotes: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'Listing',
  timestamps: true
});

class Lead extends Model {}

Lead.init({
  leadId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  listingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Listings',
      key: 'id'
    }
  },
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Agents',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  contactMethod: {
    type: DataTypes.ENUM('phone', 'email', 'whatsapp', 'in_app'),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'qualified', 'converted', 'lost'),
    defaultValue: 'new'
  },
  source: {
    type: DataTypes.ENUM('search', 'featured', 'promoted', 'direct'),
    defaultValue: 'search'
  }
}, {
  sequelize,
  modelName: 'Lead',
  timestamps: true
});

class Review extends Model {}

Review.init({
  reviewId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Agents',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  listingId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Listings',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT
  },
  categories: {
    type: DataTypes.JSONB
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  sequelize,
  modelName: 'Review',
  timestamps: true
});

class Payment extends Model {}

Payment.init({
  paymentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Agents',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'NGN'
  },
  paymentMethod: {
    type: DataTypes.ENUM('card', 'bank_transfer', 'paystack', 'flutterwave'),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('subscription', 'promotion', 'verification', 'boost'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'successful', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  paymentReference: {
    type: DataTypes.STRING
  },
  gatewayResponse: {
    type: DataTypes.JSONB
  },
  subscriptionDetails: {
    type: DataTypes.JSONB
  }
}, {
  sequelize,
  modelName: 'Payment',
  timestamps: true
});

class Report extends Model {}

Report.init({
  reportId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  listingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Listings',
      key: 'id'
    }
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reason: {
    type: DataTypes.ENUM('fake_listing', 'incorrect_info', 'spam', 'inappropriate_content', 'other'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'investigating', 'resolved', 'dismissed'),
    defaultValue: 'pending'
  },
  adminNotes: {
    type: DataTypes.TEXT
  },
  resolvedById: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Admins',
      key: 'id'
    }
  },
  resolvedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Report',
  timestamps: true
});

module.exports = {
  User,
  Agent,
  Listing,
  Lead,
  Review,
  Payment,
  Report
};