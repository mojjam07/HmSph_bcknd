const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Backend API server URL and port, configurable via environment variable

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Properties endpoints
  static async getProperties(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });

    const endpoint = queryParams.toString() 
      ? `/properties?${queryParams.toString()}`
      : '/properties';
      
    return this.request(endpoint);
  }

  static async getProperty(id) {
    return this.request(`/properties/${id}`);
  }

  static async addToFavorites(propertyId) {
    return this.request('/favorites', {
      method: 'POST',
      body: JSON.stringify({ propertyId }),
    });
  }

  static async removeFromFavorites(propertyId) {
    return this.request(`/favorites/${propertyId}`, {
      method: 'DELETE',
    });
  }

  static async getFavorites() {
    return this.request('/favorites');
  }

  static async searchProperties(query) {
    return this.request(`/properties/search?q=${encodeURIComponent(query)}`);
  }
}

export default ApiService;


async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data;
  
  try {
    if (contentType && contentType.indexOf('application/json') !== -1) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (parseError) {
    console.error('Error parsing response:', parseError);
    data = { error: 'Failed to parse server response' };
  }
  
  if (!response.ok) {
    // Handle different types of error responses
    let errorMessage = 'Unknown error';
    
    if (data && typeof data === 'object' && data.error) {
      errorMessage = data.error;
    } else if (data && typeof data === 'object' && data.message) {
      errorMessage = data.message;
    } else if (typeof data === 'string') {
      errorMessage = data;
    } else if (response.statusText) {
      errorMessage = response.statusText;
    }
    
    // Add status code context for debugging
    if (response.status === 401) {
      errorMessage = errorMessage === 'Unauthorized' ? 'Invalid email or password' : errorMessage;
    } else if (response.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    
    throw new Error(errorMessage);
  }
  
  return data;
}

// Unified registration function for all user types
export async function register(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const jsonResponse = await handleResponse(response);
    console.log('Raw register response:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('register error:', error);
    throw error;
  }
}

export async function login(credentials) {
  try {
    // Validate input
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('login error:', error);
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
}

export async function getProfile(token) {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('getProfile error:', error);
    throw error;
  }
}

export async function getListings() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/listings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('getListings error:', error);
    throw error;
  }
}