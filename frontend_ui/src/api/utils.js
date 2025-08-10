// Utility function to handle API responses with enhanced JSON parsing
export async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  let data;
  
  try {
    // Handle empty responses gracefully
    if (response.status === 204 || response.status === 201) {
      return { success: true, message: 'Request completed successfully' };
    }
    
    // Get raw response text first
    const rawText = await response.text();
    
    if (!rawText.trim()) {
      // Empty response but status is OK
      if (response.ok) {
        return [];
      }
      throw new Error('Empty response received');
    }
    
    // Only attempt JSON parsing if content type indicates JSON or looks like JSON
    const isJsonContent = contentType.includes('application/json') || 
                         rawText.trim().startsWith('{') || 
                         rawText.trim().startsWith('[');
    
    if (isJsonContent) {
      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        // If JSON parsing fails, check if response is OK
        if (response.ok) {
          // For successful responses, return empty array/object instead of throwing
          console.warn('Invalid JSON response, returning empty array:', {
            status: response.status,
            contentType,
            rawText: rawText.substring(0, 100)
          });
          return [];
        }
        
        // For error responses, provide meaningful error
        throw new Error(`Invalid JSON response from server (status ${response.status})`);
      }
    } else {
      // Non-JSON response - return as text
      data = rawText;
    }
  } catch (parseError) {
    console.error('Response parsing error:', parseError);
    // Don't throw for parsing errors on successful responses
    if (response.ok) {
      return [];
    }
    throw new Error(`Failed to parse server response: ${parseError.message}`);
  }
  
  if (!response.ok) {
    // Handle HTTP errors
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    if (data && typeof data === 'object') {
      if (data.error) errorMessage = data.error;
      else if (data.message) errorMessage = data.message;
      else if (data.details) errorMessage = data.details;
    } else if (typeof data === 'string' && data.trim()) {
      errorMessage = data;
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.statusText = response.statusText;
    error.response = data;
    throw error;
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
