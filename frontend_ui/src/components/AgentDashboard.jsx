import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit3, Trash2, Eye, Heart, Phone, Mail,
  Building, Home, MapPin, Bed, Bath, Square, Calendar, DollarSign,
  TrendingUp, Users, Star, BarChart3, Settings, LogOut, Bell,
  Upload, X, Check, AlertCircle, Camera, Save, MoreHorizontal,
  Grid3X3, List, SortAsc, SortDesc, RefreshCw
} from 'lucide-react';

const AgentDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('properties');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for adding/editing properties
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

  // Sample agent data
  const agentData = {
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

  // Sample properties data
  useEffect(() => {
    const sampleProperties = [
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
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
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
      },
      {
        id: '3',
        title: '3-Bedroom Terraced House in Ikeja GRA',
        description: 'Spacious family home with garden and garage.',
        propertyType: 'house',
        address: 'Ikeja GRA, Lagos',
        area: 'Ikeja',
        state: 'Lagos',
        price: 55000000,
        currency: '₦',
        bedrooms: 3,
        bathrooms: 4,
        size: '280sqm',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
        features: ['Garden', 'Garage', 'Security'],
        status: 'sold',
        views: 156,
        favorites: 25,
        inquiries: 15,
        dateAdded: '2023-12-20',
        lastUpdated: '2024-01-05'
      }
    ];
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  // Filter and search properties
  useEffect(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort properties
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'views':
          aValue = a.views;
          bValue = b.views;
          break;
        case 'date':
        default:
          aValue = new Date(a.dateAdded);
          bValue = new Date(b.dateAdded);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProperties(filtered);
  }, [properties, searchQuery, statusFilter, sortBy, sortOrder]);

  const formatPrice = (amount) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  const handleAddProperty = () => {
    const newProperty = {
      ...propertyForm,
      id: Date.now().toString(),
      price: parseInt(propertyForm.price),
      bedrooms: parseInt(propertyForm.bedrooms),
      bathrooms: parseInt(propertyForm.bathrooms),
      views: 0,
      favorites: 0,
      inquiries: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setProperties([newProperty, ...properties]);
    setShowAddProperty(false);
    resetForm();
  };

  const handleEditProperty = (property) => {
    setPropertyForm(property);
    setSelectedProperty(property);
    setIsEditing(true);
    setShowAddProperty(true);
  };

  const handleUpdateProperty = () => {
    const updatedProperties = properties.map(p => 
      p.id === selectedProperty.id 
        ? { ...propertyForm, lastUpdated: new Date().toISOString().split('T')[0] }
        : p
    );
    setProperties(updatedProperties);
    setShowAddProperty(false);
    setIsEditing(false);
    resetForm();
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Navigation Sidebar
  const Sidebar = () => (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">RealtyPro</h1>
            <p className="text-xs text-gray-500">Agent Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {[
          { id: 'properties', label: 'Properties', icon: Home },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'inquiries', label: 'Inquiries', icon: Mail },
          { id: 'profile', label: 'Profile', icon: Users },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
              activeTab === item.id 
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  // Top Header
  const Header = () => (
    <div className="ml-64 bg-white shadow-sm border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <img 
              src={agentData.avatar} 
              alt={agentData.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-gray-900">{agentData.name}</div>
              <div className="text-sm text-gray-500">Agent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Stats Cards
  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { 
          label: 'Total Properties', 
          value: agentData.totalProperties, 
          icon: Building, 
          color: 'blue',
          change: '+12%'
        },
        { 
          label: 'Active Listings', 
          value: agentData.activeListing, 
          icon: Home, 
          color: 'green',
          change: '+8%'
        },
        { 
          label: 'Properties Sold', 
          value: agentData.sold, 
          icon: TrendingUp, 
          color: 'purple',
          change: '+23%'
        },
        { 
          label: 'Total Revenue', 
          value: agentData.revenue, 
          icon: DollarSign, 
          color: 'yellow',
          change: '+15%'
        }
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <span className="text-green-600 text-sm font-medium">{stat.change}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-gray-600 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );

  // Property Form Modal
  const PropertyForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </h3>
          <button 
            onClick={() => {
              setShowAddProperty(false);
              setIsEditing(false);
              resetForm();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                value={propertyForm.title}
                onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                placeholder="Enter property title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={propertyForm.propertyType}
                onChange={(e) => setPropertyForm({...propertyForm, propertyType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="duplex">Duplex</option>
                <option value="bungalow">Bungalow</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={propertyForm.address}
                onChange={(e) => setPropertyForm({...propertyForm, address: e.target.value})}
                placeholder="Enter full address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <input
                type="text"
                value={propertyForm.area}
                onChange={(e) => setPropertyForm({...propertyForm, area: e.target.value})}
                placeholder="e.g., Lekki, VI, Ikeja"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={propertyForm.state}
                onChange={(e) => setPropertyForm({...propertyForm, state: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Rivers">Rivers</option>
                <option value="Ogun">Ogun</option>
              </select>
            </div>
          </div>

          {/* Price and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
              <input
                type="number"
                value={propertyForm.price}
                onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                type="number"
                value={propertyForm.bedrooms}
                onChange={(e) => setPropertyForm({...propertyForm, bedrooms: e.target.value})}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                type="number"
                value={propertyForm.bathrooms}
                onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <input
                type="text"
                value={propertyForm.size}
                onChange={(e) => setPropertyForm({...propertyForm, size: e.target.value})}
                placeholder="e.g., 450sqm"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={propertyForm.description}
              onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})}
              placeholder="Describe the property features, amenities, and unique selling points..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Files
              </button>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={propertyForm.status}
              onChange={(e) => setPropertyForm({...propertyForm, status: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={() => {
              setShowAddProperty(false);
              setIsEditing(false);
              resetForm();
            }}
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={isEditing ? handleUpdateProperty : handleAddProperty}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isEditing ? 'Update Property' : 'Add Property'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Property Card Component
  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
            <span className="text-sm font-bold">{formatPrice(property.price)}</span>
          </div>
        </div>

        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleEditProperty(property)}
              className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeleteProperty(property.id)}
              className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{property.address}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Bed className="h-4 w-4 mx-auto mb-1 text-gray-400" />
            <div className="text-sm font-semibold text-gray-900">{property.bedrooms}</div>
          </div>
          <div className="text-center">
            <Bath className="h-4 w-4 mx-auto mb-1 text-gray-400" />
            <div className="text-sm font-semibold text-gray-900">{property.bathrooms}</div>
          </div>
          <div className="text-center">
            <Square className="h-4 w-4 mx-auto mb-1 text-gray-400" />
            <div className="text-sm font-semibold text-gray-900">{property.size}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{property.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{property.favorites}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>{property.inquiries}</span>
            </div>
          </div>
          <div className="text-xs">
            Added: {new Date(property.dateAdded).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );

  // Properties List View
  const PropertiesListView = () => (
    <div className="space-y-4">
      {filteredProperties.map((property) => (
        <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-6">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 truncate">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-900">{formatPrice(property.price)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>{property.bedrooms} beds</span>
                  <span>{property.bathrooms} baths</span>
                  <span>{property.size}</span>
                  <span>{property.views} views</span>
                  <span>{property.inquiries} inquiries</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditProperty(property)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Properties Tab Content
  const PropertiesTab = () => (
    <div className="ml-64 p-8">
      <Header />
      
      <div className="mt-8">
        <StatsCards />

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="views">Sort by Views</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={() => setShowAddProperty(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Property</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Start by adding your first property listing.</p>
            <button
              onClick={() => setShowAddProperty(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <PropertiesListView />
            )}
          </>
        )}
      </div>

      {/* Property Form Modal */}
      {showAddProperty && <PropertyForm />}
    </div>
  );

  // Analytics Tab Content
  const AnalyticsTab = () => (
    <div className="ml-64 p-8">
      <Header />
      
      <div className="mt-8">
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Performance</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Performance chart would go here</p>
              </div>
            </div>
          </div>

          {/* Property Views */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Properties</h3>
            <div className="space-y-4">
              {filteredProperties.slice(0, 3).map((property, index) => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900 truncate max-w-48">{property.title}</div>
                      <div className="text-sm text-gray-600">{property.views} views</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatPrice(property.price)}</div>
                    <div className="text-sm text-gray-600">{property.inquiries} inquiries</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New inquiry received', property: 'Luxury 4-Bedroom Duplex', time: '2 hours ago', type: 'inquiry' },
              { action: 'Property viewed', property: '2-Bedroom Apartment in VI', time: '4 hours ago', type: 'view' },
              { action: 'Property favorited', property: '3-Bedroom Terraced House', time: '6 hours ago', type: 'favorite' },
              { action: 'Price updated', property: 'Luxury 4-Bedroom Duplex', time: '1 day ago', type: 'update' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'inquiry' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'view' ? 'bg-green-100 text-green-600' :
                  activity.type === 'favorite' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {activity.type === 'inquiry' && <Mail className="h-5 w-5" />}
                  {activity.type === 'view' && <Eye className="h-5 w-5" />}
                  {activity.type === 'favorite' && <Heart className="h-5 w-5" />}
                  {activity.type === 'update' && <Edit3 className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.property}</div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Tab Content
  const ProfileTab = () => (
    <div className="ml-64 p-8">
      <Header />
      
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <img 
                src={agentData.avatar} 
                alt={agentData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{agentData.name}</h2>
              <p className="text-gray-600">{agentData.email}</p>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{agentData.rating}</span>
                <span className="text-gray-600">rating</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={agentData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={agentData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue={agentData.phone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    placeholder="Enter license number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>6-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Luxury Properties</option>
                    <option>Land & Development</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'properties':
        return <PropertiesTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <PropertiesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {renderTabContent()}
    </div>
  );
};

export default AgentDashboard;
