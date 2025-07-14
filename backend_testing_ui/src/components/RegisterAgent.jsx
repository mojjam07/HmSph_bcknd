import { useState } from 'react';
import { registerAgent } from '../api';

export default function RegisterAgent() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    businessName: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const result = await registerAgent(formData);
      if (result.error) {
        setMessage('Error: ' + result.error);
      } else {
        setMessage('Agent registered successfully. Token: ' + result.token);
      }
    } catch (err) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Agent Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input name="businessName" type="text" placeholder="Business Name" value={formData.businessName} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register Agent</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
