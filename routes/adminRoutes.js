const express = require('express');
const router = express.Router();

// Admin Dashboard route
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin Dashboard' });
});

// Agents Management route
router.get('/agents', (req, res) => {
  res.json({ message: 'Agents Management' });
});

// Listings Management route
router.get('/listings', (req, res) => {
  res.json({ message: 'Listings Management' });
});

// Leads Management route
router.get('/leads', (req, res) => {
  res.json({ message: 'Leads Management' });
});

// Reviews Management route
router.get('/reviews', (req, res) => {
  res.json({ message: 'Reviews Management' });
});

// Payments Management route
router.get('/payments', (req, res) => {
  res.json({ message: 'Payments Management' });
});

// Reports Management route
router.get('/reports', (req, res) => {
  res.json({ message: 'Reports Management' });
});

module.exports = router;
