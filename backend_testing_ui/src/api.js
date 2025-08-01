const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Backend API server URL and port, configurable via environment variable

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const error = (data && data.error) || response.statusText || 'Unknown error';
    throw new Error(error);
  }
  return data;
}

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const jsonResponse = await handleResponse(response);
    console.log('Raw registerUser response:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('registerUser error:', error);
    throw error;
  }
}

export async function registerAgent(agentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('registerAgent error:', error);
    throw error;
  }
}

export async function registerAdmin(adminData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('registerAdmin error:', error);
    throw error;
  }
}

export async function login(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('login error:', error);
    throw error;
  }
}

export async function getProfile(token) {
  try {
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
