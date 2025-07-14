// Express.js API Routes and Controllers for Housing Marketplace

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { sequelize } = require('./config/db'); // Import Sequelize instance

// Route Imports
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to PostgreSQL
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL', err);
    process.exit(1);
  });

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve frontend static files
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));

// Route to serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend_testing_ui', 'index.html'));
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'housing-marketplace',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  }
});

const upload = multer({ storage: storage });

// ==================== API ROUTES ====================
app.use('/api/auth', authRoutes);
// You can add other route modules here, e.g., app.use('/api/listings', listingRoutes);

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HomeSphere API server running on port ${PORT}`);
});
