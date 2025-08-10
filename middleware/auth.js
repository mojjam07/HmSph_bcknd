const jwt = require('jsonwebtoken');
const securityConfig = require('../config/security');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, securityConfig.jwt.secret, {
      algorithms: [securityConfig.jwt.algorithm]
    });
    
    // Dynamically import models to avoid circular dependencies
    const { User } = require('../models/model1');
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token - user not found' 
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Account is deactivated' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token format' 
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

const authenticateAgent = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, securityConfig.jwt.secret, {
      algorithms: [securityConfig.jwt.algorithm]
    });
    
    const { Agent } = require('../models/model1');
    const agent = await Agent.findByPk(decoded.id);
    
    if (!agent) {
      return res.status(403).json({ 
        success: false,
        message: 'Agent access required' 
      });
    }

    if (!agent.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Agent account is deactivated' 
      });
    }

    req.agent = agent;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired' 
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, securityConfig.jwt.secret, {
      algorithms: [securityConfig.jwt.algorithm]
    });
    
    const { User } = require('../models/model1');
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token - user not found' 
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Account is deactivated' 
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Admin access required' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token format' 
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

module.exports = {
  authenticateToken,
  authenticateAgent,
  authenticateAdmin
};
