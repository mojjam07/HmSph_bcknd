import { useState } from 'react';
import { login } from '../api';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
