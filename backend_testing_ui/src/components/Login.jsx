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
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-input" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input className="login-input" name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input className="login-input" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button className="login-button" type="submit">Login</button>
      </form>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
}
