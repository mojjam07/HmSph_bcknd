const API_BASE_URL = 'http://localhost:3000'; // Backend API server URL and port

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const jsonResponse = await response.json();
  console.log('Raw registerUser response:', jsonResponse);
  return jsonResponse;
}

export async function registerAgent(agentData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register/agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agentData)
  });
  return response.json();
}

export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
}

export async function getProfile(token) {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}
