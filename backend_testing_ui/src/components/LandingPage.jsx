import React, { useEffect, useState } from 'react';
import { getListings } from '../api';

const LandingPage = ({ onNavigate }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        if (data.success) {
          setListings(data.listings);
        } else {
          setError('Failed to load listings');
        }
      } catch (err) {
        setError('Error fetching listings');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <h1>Property Listings</h1>
      <nav>
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => onNavigate('registerUser')}>Register User</button>
        <button onClick={() => onNavigate('registerAgent')}>Register Agent</button>
      </nav>
      {loading && <p>Loading listings...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {listings.map(listing => (
          <div key={listing.listingId} style={{ border: '1px solid #ccc', padding: '1rem', width: '300px' }}>
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p><strong>Type:</strong> {listing.propertyType}</p>
            <p><strong>Price:</strong> {listing.price?.amount ? `${listing.price.amount} ${listing.price.currency || ''}` : 'N/A'}</p>
            <p><strong>Location:</strong> {listing.location?.address || 'N/A'}</p>
            {listing.images && listing.images.length > 0 && (
              <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: 'auto' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
