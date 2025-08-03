const { User, Agent, Admin } = require('../models/model1.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Unified Registration
const register = async (req, res, next) => {
  try {
    let { role, email, firstName, lastName, password, phone, businessName, licenseNumber, yearsOfExperience, department, employeeId } = req.body;

    // Validate required fields based on role
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Role-specific validation
    if (role === 'agent') {
      if (!phone || !businessName || !licenseNumber) {
        return res.status(400).json({ error: 'Missing required fields for agent' });
      }
    } else if (role === 'admin') {
      if (!department || !employeeId) {
        return res.status(400).json({ error: 'Missing required fields for admin' });
      }
      // Generate placeholder phone number for admin if not provided
      if (!phone) {
        phone = `ADMIN_PHONE_${Date.now()}`;
      }
    } else {
      // Regular user
      if (!phone) {
        return res.status(400).json({ error: 'Missing required fields for user' });
      }
    }

    // Check if user already exists (across all roles)
    let existingUser = null;
    
    // Build dynamic conditions array for email and phone
    const userConditions = [];
    if (email) userConditions.push({ email });
    if (phone) userConditions.push({ phone });
    
    // Check in Users table
    if (userConditions.length > 0) {
      existingUser = await User.findOne({
        where: {
          [Op.or]: userConditions
        }
      });
    }
    
    // Check in Agents table
    if (!existingUser && userConditions.length > 0) {
      existingUser = await Agent.findOne({
        where: {
          [Op.or]: userConditions
        }
      });
    }
    
    // Check in Admins table
    if (!existingUser && email) {
      existingUser = await Admin.findOne({
        where: { email }
      });
    }
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' });
    }

    // Create user based on role (password will be hashed automatically by model hooks)
    let newUser;
    if (role === 'agent') {
      newUser = await User.create({
        email,
        phone,
        firstName,
        lastName,
        password,
        role: 'agent',
        businessName,
        licenseNumber,
        yearsOfExperience
      });
      
      // Also create in Agents table for backward compatibility
      await Agent.create({
        email,
        phone,
        firstName,
        lastName,
        password,
        businessName,
        licenseNumber,
        yearsOfExperience
      });
      
      // Generate JWT token with consistent field naming
      const token = jwt.sign(
        { id: newUser.userId, role: 'agent' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Agent registered successfully',
        token,
        user: { 
          id: newUser.userId, 
          email: newUser.email, 
          firstName: newUser.firstName, 
          lastName: newUser.lastName, 
          role: 'agent',
          businessName: newUser.businessName
        }
      });
    } else if (role === 'admin') {
      newUser = await User.create({
        email,
        phone,
        firstName,
        lastName,
        password,
        role: 'admin',
        department,
        employeeId
      });
      
      // Also create in Admins table for backward compatibility
      await Admin.create({
        email,
        firstName,
        lastName,
        password,
        department,
        employeeId
      });
      
      // Generate JWT token with consistent field naming
      const token = jwt.sign(
        { id: newUser.userId, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Admin registered successfully',
        token,
        user: { 
          id: newUser.userId, 
          email: newUser.email, 
          firstName: newUser.firstName, 
          lastName: newUser.lastName, 
          role: 'admin',
          department: newUser.department
        }
      });
    } else {
      // Regular user
      newUser = await User.create({
        email,
        phone,
        firstName,
        lastName,
        password,
        role: 'user'
      });
      
      // Generate JWT token with consistent field naming
      const token = jwt.sign(
        { id: newUser.userId, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { 
          id: newUser.userId, 
          email: newUser.email, 
          firstName: newUser.firstName, 
          lastName: newUser.lastName, 
          role: 'user' 
        }
      });
    }
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// User Registration (deprecated - keeping for backward compatibility)
const registerUser = async (req, res, next) => {
  try {
    const { email, phone, firstName, lastName, password } = req.body;

    // Build dynamic conditions array for email and phone
    const userConditions = [];
    if (email) userConditions.push({ email });
    if (phone) userConditions.push({ phone });

    // Check if user already exists
    let existingUser = null;
    if (userConditions.length > 0) {
      existingUser = await User.findOne({
        where: {
          [Op.or]: userConditions
        }
      });
    }
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' });
    }

    // Create new user (password will be hashed automatically by model hooks)
    const user = await User.create({ email, phone, firstName, lastName, password });

    // Generate JWT token with consistent field naming
    const token = jwt.sign(
      { id: user.userId, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.userId, email: user.email, firstName: user.firstName, lastName: user.lastName, role: 'user' }
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Agent Registration (deprecated - keeping for backward compatibility)
const registerAgent = async (req, res, next) => {
  try {
    const { email, phone, firstName, lastName, password, businessName } = req.body;

    // Build dynamic conditions array for email and phone
    const agentConditions = [];
    if (email) agentConditions.push({ email });
    if (phone) agentConditions.push({ phone });

    let existingAgent = null;
    if (agentConditions.length > 0) {
      existingAgent = await Agent.findOne({
        where: {
          [Op.or]: agentConditions
        }
      });
    }
    
    if (existingAgent) {
      return res.status(400).json({ error: 'Agent already exists with this email or phone' });
    }

    // Create new agent (password will be hashed automatically by model hooks)
    const agent = await Agent.create({ email, phone, firstName, lastName, password, businessName });

    // Generate JWT token with consistent field naming
    const token = jwt.sign(
      { id: agent.agentId, role: 'agent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Agent registered successfully',
      token,
      agent: { id: agent.agentId, email: agent.email, firstName: agent.firstName, lastName: agent.lastName, businessName: agent.businessName, role: 'agent' }
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    let { email, phone, password } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone must be provided' });
    }

    // Lowercase email if provided
    if (email) {
      email = email.toLowerCase();
    }

    // Build dynamic conditions array for email and phone
    const conditions = [];
    if (email) conditions.push({ email });
    if (phone) conditions.push({ phone });

    // Check across all tables in order of priority
    let user = null;
    let role = null;
    
    // Check in Users table first (new unified approach)
    user = await User.findOne({
      where: {
        [Op.or]: conditions
      }
    });
    
    if (user) {
      role = user.role || 'user';
    }

    // If not found in Users, check Admins table
    if (!user && email) {
      user = await Admin.findOne({
        where: { email }
      });
      if (user) role = 'admin';
    }

    // If not found in Admins, check Agents table
    if (!user) {
      user = await Agent.findOne({
        where: {
          [Op.or]: conditions
        }
      });
      if (user) role = 'agent';
    }

    if (!user) {
      return res.status(400).json({ error: 'User, agent or admin not found' });
    }

    console.log('Stored hashed password:', user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Use consistent id field in token payload
    let id;
    if (role === 'user' || role === 'agent' || role === 'admin') {
      // For new unified approach, use userId
      if (user.userId) {
        id = user.userId;
      } else if (user.agentId) {
        id = user.agentId;
      } else {
        id = user.id;
      }
    } else {
      id = user.id;
    }

    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Build response user object with additional fields
    const responseUser = {
      id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role
    };

    // Add role-specific fields
    if (role === 'agent') {
      responseUser.businessName = user.businessName;
      responseUser.licenseNumber = user.licenseNumber;
      responseUser.yearsOfExperience = user.yearsOfExperience;
    } else if (role === 'admin') {
      responseUser.department = user.department;
      responseUser.employeeId = user.employeeId;
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: responseUser
    });
  } catch (error) {
    next(error);
  }
};

// Get Profile
const getProfile = async (req, res, next) => {
  try {
    console.log('Decoded token payload:', req.user);
    
    let user;
    if (req.user.role === 'user') {
      user = await User.findOne({ 
        where: { userId: req.user.id }, 
        attributes: { exclude: ['password'] } 
      });
    } else if (req.user.role === 'agent') {
      // First try to get from Users table
      user = await User.findOne({ 
        where: { userId: req.user.id }, 
        attributes: { exclude: ['password'] } 
      });
      
      // If not found, try Agents table (for backward compatibility)
      if (!user) {
        user = await Agent.findOne({ 
          where: { agentId: req.user.id }, 
          attributes: { exclude: ['password'] } 
        });
      }
    } else if (req.user.role === 'admin') {
      // First try to get from Users table
      user = await User.findOne({
        where: { userId: req.user.id },
        attributes: { exclude: ['password'] }
      });
      
      // If not found, try Admins table (for backward compatibility)
      if (!user) {
        user = await Admin.findOne({
          where: { id: req.user.id },
          attributes: { exclude: ['password'] }
        });
      }
    }
    
    console.log('User found:', user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Build response with role-specific fields
    const responseUser = {
      ...user.toJSON(),
      role: req.user.role
    };
    
    res.json(responseUser);
  } catch (error) {
    console.error('Error in getProfile:', error);
    next(error);
  }
};

module.exports = { register, registerUser, registerAgent, login, getProfile };
