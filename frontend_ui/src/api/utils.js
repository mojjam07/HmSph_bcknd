// Utility function to handle API responses
export async function handleResponse(response) {
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

// Base request function for all API calls
export async function apiRequest(endpoint, options = {}) {
  const { API_BASE_URL } = await import('./config.js');
  const { getHeaders } = await import('./config.js');
  
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
