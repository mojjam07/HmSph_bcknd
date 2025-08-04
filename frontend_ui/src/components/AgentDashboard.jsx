import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './AgentDashboard/Sidebar';
import Header from './AgentDashboard/Header';
import StatsCards from './AgentDashboard/StatsCards';
import ErrorAlert from './AgentDashboard/ErrorAlert';
import LoadingOverlay from './AgentDashboard/LoadingOverlay';
import PropertyForm from './AgentDashboard/PropertyForm';

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const [agentData, setAgentData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userRole, setUserRole] = useState('agent'); // 'agent', 'admin', 'user'
  
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    address: '',
    area: '',
    state: 'Lagos',
    price: '',
    currency: '₦',
    bedrooms: '',
    bathrooms: '',
    size: '',
    images: [],
    features: [],
    status: 'active'
  });

  // Load initial data and user info
  useEffect(() => {
    loadUserData();
    loadInitialData();
  }, []);

  const loadUserData = async () => {
    try {
      // Get user from localStorage or auth context
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        setAgentData(user);
        setUserRole(user.role || 'agent');
      } else if (token) {
        // Fallback: load from API
        const response = await fetch('/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const user = await response.json();
        setAgentData(user);
        setUserRole(user.role || 'agent');
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
      // Default to agent role
      setUserRole('agent');
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration - replace with actual API calls
      const mockAgentData = {
        name: 'Sarah Johnson',
        email: 'sarah@realtypro.ng',
        phone: '+234-802-567-8901',
        rating: 4.8,
        totalProperties: 24,
        activeListing: 18,
        sold: 32,
        revenue: '₦125.5M',
        avatar: '/api/placeholder/80/80'
      };

      const mockProperties = [
        {
          id: '1',
          title: 'Luxury 4-Bedroom Duplex in Lekki Phase 1',
          description: 'Beautiful modern duplex with swimming pool, BQ, and premium finishes.',
          propertyType: 'house',
          address: 'Lekki Phase 1, Lagos',
          area: 'Lekki',
          state: 'Lagos',
          price: 85000000,
          currency: '₦',
          bedrooms: 4,
          bathrooms: 5,
          size: '450sqm',
          images: ['/api/placeholder/400/300'],
          features: ['Swimming Pool', 'BQ', 'Parking', 'Security'],
          status: 'active',
          views: 245,
          favorites: 18,
          inquiries: 12,
          dateAdded: '2024-01-15',
          lastUpdated: '2024-01-20'
        },
        {
          id: '2',
          title: '2-Bedroom Apartment in Victoria Island',
          description: 'Furnished apartment in prime location with ocean view.',
          propertyType: 'apartment',
          address: 'Victoria Island, Lagos',
          area: 'VI',
          state: 'Lagos',
          price: 35000000,
          currency: '₦',
          bedrooms: 2,
          bathrooms: 3,
          size: '120sqm',
          images: ['/api/placeholder/400/300'],
          features: ['Furnished', 'Ocean View', 'Generator'],
          status: 'pending',
          views: 89,
          favorites: 12,
          inquiries: 8,
          dateAdded: '2024-01-10',
          lastUpdated: '2024-01-18'
        }
      ];

      setAgentData(mockAgentData);
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Load initial data error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties based on search and status
  useEffect(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort properties
    filtered.sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    setFilteredProperties(filtered);
  }, [properties, searchQuery, statusFilter]);

  const handleRefresh = () => {
    loadInitialData();
  };

  const handleAddProperty = async () => {
    setLoading(true);
    try {
      // Mock property creation - replace with actual API call
      const newProperty = {
        id: Date.now().toString(),
        ...propertyForm,
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      setProperties([newProperty, ...properties]);
      setShowAddProperty(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setPropertyForm(property);
    setIsEditing(true);
    setShowAddProperty(true);
  };

  const handleUpdateProperty = async () => {
    setLoading(true);
    try {
      // Mock property update - replace with actual API call
      const updatedProperties = properties.map(p => 
        p.id === selectedProperty.id ? { ...propertyForm, lastUpdated: new Date().toISOString() } : p
      );
      setProperties(updatedProperties);
      setShowAddProperty(false);
      setIsEditing(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError('Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    setLoading(true);
    try {
      // Mock property deletion - replace with actual API call
      setProperties(properties.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete property');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPropertyForm({
      title: '',
      description: '',
      propertyType: 'apartment',
      address: '',
      area: '',
      state: 'Lagos',
      price: '',
      currency: '₦',
      bedrooms: '',
      bathrooms: '',
      size: '',
      images: [],
      features: [],
      status: 'active'
    });
    setSelectedProperty(null);
  };

  const formatPrice = (amount) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-64">
        <Header 
          activeTab={activeTab} 
          loading={loading} 
          agentData={agentData} 
          handleRefresh={handleRefresh} 
        />
        
        <main className="p-8">
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
          {loading && <LoadingOverlay />}

          <StatsCards agentData={agentData} properties={properties} />

          {activeTab === 'properties' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
                <button
                  onClick={() => setShowAddProperty(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add New Property
                </button>
              </div>

              <div className="mb-4 flex space-x-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search properties..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md p-4">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                    <p className="text-blue-600 font-bold text-lg mb-2">
                      {formatPrice(property.price)}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.size}</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' :
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEditProperty(property)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leads</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Leads management coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Settings page coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {showAddProperty && (
        <PropertyForm
          propertyForm={propertyForm}
          setPropertyForm={setPropertyForm}
          isEditing={isEditing}
          setShowAddProperty={setShowAddProperty}
          setIsEditing={setIsEditing}
          resetForm={resetForm}
          selectedFiles={[]}
          setSelectedFiles={() => {}}
          uploadingImages={false}
          handleAddProperty={handleAddProperty}
          handleUpdateProperty={handleUpdateProperty}
        />
      )}
    </div>
  );
};

export default AgentDashboard;
