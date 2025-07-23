const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Authorization middleware for admin roles and permissions
const authorizeAdmin = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    // Check roleType if provided
    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.roleType)) {
      return res.status(403).json({ error: 'Insufficient admin privileges' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeAdmin
};
