import { useState } from 'react';
import { registerAdmin } from '../api';
import Input from './common/Input';
import Button from './common/Button';

export default function RegisterAdmin() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
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
      const result = await registerAdmin(formData);
      if (result.error) {
        setMessage('Error: ' + result.error);
      } else {
        setMessage('Admin registered successfully.');
        // Optionally, handle the token securely here, e.g., store in localStorage or context
      }
    } catch (err) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-8 text-center drop-shadow-lg">Admin Registration</h2>
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
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="bg-white text-gray-900 placeholder-gray-400"
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
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
        <Button type="submit" className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold shadow-md">Register Admin</Button>
      </form>
      {message && <p className="mt-4 text-center text-yellow-200 font-semibold drop-shadow-md">{message}</p>}
    </div>
  );
}
