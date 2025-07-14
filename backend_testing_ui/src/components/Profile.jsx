import { useEffect, useState } from 'react';
import { getProfile } from '../api';

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      setMessage('');
      try {
        const data = await getProfile(token);
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
    return <p>Please log in to view profile.</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      {profile.businessName && <p><strong>Business Name:</strong> {profile.businessName}</p>}
      <p><strong>Role:</strong> {profile.role || 'user'}</p>
    </div>
  );
}
