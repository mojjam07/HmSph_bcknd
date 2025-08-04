// Authentication API service
import { apiRequest } from './utils.js';

export const authAPI = {
  // User registration
  async register(userData) {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // User login
  async login(credentials) {
    // Validate input
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Get user profile
  async getProfile(token) {
    if (!token) {
      throw new Error('Authentication token is required');
    }
    
    return apiRequest('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

export default authAPI;
