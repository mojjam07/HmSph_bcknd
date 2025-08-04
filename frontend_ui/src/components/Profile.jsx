import { useEffect, useState } from 'react';
import { authAPI } from '../api';

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      setMessage('');
      try {
      const data = await authAPI.getProfile(token);
        if (data.error) {
          setMessage('Error: ' + data.error);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setMessage('Failed to fetch profile.');
      }
    }
    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!token) {
    return <p className="profile-message">Please log in to view profile.</p>;
  }

  if (message) {
    return <p className="profile-message">{message}</p>;
  }

  if (!profile) {
    return <p className="profile-message">Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-item"><strong>Email:</strong> {profile.email}</p>
      <p className="profile-item"><strong>First Name:</strong> {profile.firstName}</p>
      <p className="profile-item"><strong>Last Name:</strong> {profile.lastName}</p>
      {profile.businessName && <p className="profile-item"><strong>Business Name:</strong> {profile.businessName}</p>}
      <p className="profile-item"><strong>Role:</strong> {profile.role || 'user'}</p>
    </div>
  );
}
