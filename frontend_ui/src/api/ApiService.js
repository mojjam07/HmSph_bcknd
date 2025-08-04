const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data; // Handle both {data: {...}} and direct response formats
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Properties API - Updated endpoints
  static async getProperties(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.request(`/properties${queryString ? `?${queryString}` : ''}`);
    return response.properties || response; // Handle both formats
  }

  static async getProperty(id) {
    const response = await this.request(`/properties/${id}`);
    return response.property || response; // Handle both formats
  }

  static async createProperty(propertyData) {
    const response = await this.request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
    return response.property || response; // Handle both formats
  }

  static async updateProperty(id, propertyData) {
    const response = await this.request(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
    return response.property || response; // Handle both formats
  }

  static async deleteProperty(id) {
    return this.request(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  // Agent/Profile API - Updated endpoints
  static async getAgentProfile() {
    const response = await this.request('/agents/profile');
    return response.agent || response; // Handle both formats
  }

  static async updateAgentProfile(profileData) {
    const response = await this.request('/agents/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return response.agent || response; // Handle both formats
  }

  // Analytics API - Updated endpoints
  static async getAnalytics() {
    const response = await this.request('/agents/analytics');
    return response.analytics || response; // Handle both formats
  }

  // Image upload API - Updated endpoint
  static async uploadImages(files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await this.request('/upload/properties/images', {
      method: 'POST',
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
    return response.imageUrls || response.urls || []; // Handle both formats
  }

  // Additional agent-specific endpoints
  static async getAgentProperties(agentId) {
    const response = await this.request(`/agents/${agentId}/properties`);
    return response.properties || response;
  }

  static async getAgentStats(agentId) {
    const response = await this.request(`/agents/${agentId}/stats`);
    return response.stats || response;
  }
}

export default ApiService;
