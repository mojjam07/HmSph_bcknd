require('dotenv').config();

const securityConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || (() => {
      console.error('JWT_SECRET not set, using fallback - this is insecure!');
      return 'fallback-secret-key-change-in-production';
    })(),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    algorithm: 'HS256'
  },
  
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  }
};

module.exports = securityConfig;
