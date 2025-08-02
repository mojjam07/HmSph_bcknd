import { useState } from 'react';
import { login } from '../api';
import Input from './common/Input';
import Button from './common/Button';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const result = await login(formData);
      if (result.error) {
        setMessage('Error: ' + result.error);
      } else {
        setMessage('Login successful.');
        onLogin(result.token, result.user);
      }
    } catch (err) {
      setMessage('Login failed.');
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
          className="bg-white text-gray-900 placeholder-gray-400"
        />
        <Input
          label="Phone"
          name="phone"
          type="text"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
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
        <Button type="submit" className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold shadow-md">Login</Button>
      </form>
      {message && <p className="mt-4 text-center text-yellow-200 font-semibold drop-shadow-md">{message}</p>}
    </div>
  );
}
