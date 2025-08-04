import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import Input from './common/Input';
import Button from './common/Button';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    try {
      // Only send email and password for login
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      
      const result = await authAPI.login(loginData);
      
      // Handle successful login
      setMessage('Login successful.');
      onLogin(result.token, result.user);
      
      // Redirect to respective dashboard based on user role
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'agent') {
        navigate('/agent');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      // Display the specific error message from the server
      const errorMessage = err.message || 'Login failed. Please try again.';
      setMessage(`Error: ${errorMessage}`);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-8 text-center drop-shadow-lg">Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-white text-gray-900 placeholder-gray-400"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-white text-gray-900 placeholder-gray-400"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-gray-900 font-semibold shadow-md"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      {message && (
        <p className={`mt-4 text-center font-semibold drop-shadow-md ${
          message.includes('Error') ? 'text-red-300' : 'text-yellow-200'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}
