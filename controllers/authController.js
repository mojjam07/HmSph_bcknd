const { User, Agent } = require('../models/model1.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// User Registration
const registerUser = async (req, res, next) => {
  try {
    const { email, phone, firstName, lastName, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }]
      }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' });
    }

    // Create new user
    const user = new User({ email, phone, firstName, lastName, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: 'user' }
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Agent Registration
const registerAgent = async (req, res, next) => {
  try {
    const { email, phone, firstName, lastName, password, businessName } = req.body;

    const existingAgent = await Agent.findOne({
      where: {
        [Op.or]: [{ email }, { phone }]
      }
    });
    if (existingAgent) {
      return res.status(400).json({ error: 'Agent already exists with this email or phone' });
    }

    const agent = new Agent({ email, phone, firstName, lastName, password, businessName });
    await agent.save();

    const token = jwt.sign(
      { userId: agent.id, role: 'agent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Agent registered successfully',
      token,
      agent: { id: agent.id, email: agent.email, firstName: agent.firstName, lastName: agent.lastName, businessName: agent.businessName, role: 'agent' }
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    let user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }]
      }
    });
    let role = 'user';
    if (!user) {
      user = await Agent.findOne({
        where: {
          [Op.or]: [{ email }, { phone }]
        }
      });
      role = 'agent';
    }
    if (!user) {
      return res.status(400).json({ error: 'User or agent not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role }
    });
  } catch (error) {
    next(error);
  }
};

// Get Profile
const getProfile = async (req, res, next) => {
  try {
    const Model = req.user.role === 'user' ? User : Agent;
    const user = await Model.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, registerAgent, login, getProfile };