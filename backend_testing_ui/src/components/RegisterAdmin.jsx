import { useState } from 'react';
import { registerAdmin } from '../api';

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
    <div>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
