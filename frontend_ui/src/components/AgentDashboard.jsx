import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Search, Filter, Edit3, Trash2, Eye, Heart, Phone, Mail,
  Building, Home, MapPin, Bed, Bath, Square, Calendar, DollarSign,
  TrendingUp, Users, Star, BarChart3, Settings, LogOut, Bell,
  Upload, X, Check, AlertCircle, Camera, Save, MoreHorizontal,
  Grid3X3, List, SortAsc, SortDesc, RefreshCw, Loader
} from 'lucide-react';

// API Service Layer - Updated for proper backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data; // Handle both {data: {...}} and direct response formats
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Properties API - Updated endpoints
  static async getProperties(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.request(`/properties${queryString ? `?${queryString}` : ''}`);
    return response.properties || response; // Handle both formats
  }

  static async getProperty(id) {
    const response = await this.request(`/properties/${id}`);
    return response.property || response; // Handle both formats
  }

  static async createProperty(propertyData) {
    const response = await this.request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
    return response.property || response; // Handle both formats
  }

  static async updateProperty(id, propertyData) {
    const response = await this.request(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
    return response.property || response; // Handle both formats
  }

  static async deleteProperty(id) {
    return this.request(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  // Agent/Profile API - Updated endpoints
  static async getAgentProfile() {
    const response = await this.request('/agents/profile');
    return response.agent || response; // Handle both formats
  }

  static async updateAgentProfile(profileData) {
    const response = await this.request('/agents/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return response.agent || response; // Handle both formats
  }

  // Analytics API - Updated endpoints
  static async getAnalytics() {
    const response = await this.request('/agents/analytics');
    return response.analytics || response; // Handle both formats
  }

  // Image upload API - Updated endpoint
  static async uploadImages(files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await this.request('/upload/properties/images', {
      method: 'POST',
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
    return response.imageUrls || response.urls || []; // Handle both formats
  }

  // Additional agent-specific endpoints
  static async getAgentProperties(agentId) {
    const response = await this.request(`/agents/${agentId}/properties`);
    return response.properties || response;
  }

  static async getAgentStats(agentId) {
    const response = await this.request(`/agents/${agentId}/stats`);
    return response.stats || response;
  }
}

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

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [analytics, setAnalytics] = useState(null);

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

  // Image upload state
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [propertiesData, agentProfile] = await Promise.all([
        ApiService.getProperties(),
        ApiService.getAgentProfile(),
      ]);

      setProperties(propertiesData.properties || propertiesData);
      setAgentData(agentProfile);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Load initial data error:', err);
      // Fallback to sample data if API fails
      loadSampleData();
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleAgentData = {
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
      }
    ];

    setAgentData(sampleAgentData);
    setProperties(sampleProperties);
  };

  // Load analytics data
  const loadAnalytics = useCallback(async () => {
    try {
      const analyticsData = await ApiService.getAnalytics();
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'analytics') {
      loadAnalytics();
    }
  }, [activeTab, loadAnalytics]);

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
          aValue = a.views || 0;
          bValue = b.views || 0;
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

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return [];

    setUploadingImages(true);
    try {
      const uploadResult = await ApiService.uploadImages(Array.from(files));
      return uploadResult.imageUrls || [];
    } catch (err) {
      setError('Failed to upload images');
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  const handleAddProperty = async () => {
    setLoading(true);
    try {
      // Upload images first if any
      let imageUrls = propertyForm.images;
      if (selectedFiles.length > 0) {
        imageUrls = await handleImageUpload(selectedFiles);
      }

      const propertyData = {
        ...propertyForm,
        price: parseInt(propertyForm.price),
        bedrooms: parseInt(propertyForm.bedrooms),
        bathrooms: parseInt(propertyForm.bathrooms),
        images: imageUrls,
      };

      const newProperty = await ApiService.createProperty(propertyData);
      setProperties([newProperty, ...properties]);
      setShowAddProperty(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError('Failed to add property');
      console.error('Add property error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProperty = (property) => {
    setPropertyForm(property);
    setSelectedProperty(property);
    setIsEditing(true);
    setShowAddProperty(true);
  };

  const handleUpdateProperty = async () => {
    setLoading(true);
    try {
      // Upload new images if any
      let imageUrls = propertyForm.images;
      if (selectedFiles.length > 0) {
        const newImageUrls = await handleImageUpload(selectedFiles);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const propertyData = {
        ...propertyForm,
        price: parseInt(propertyForm.price),
        bedrooms: parseInt(propertyForm.bedrooms),
        bathrooms: parseInt(propertyForm.bathrooms),
        images: imageUrls,
      };

      const updatedProperty = await ApiService.updateProperty(selectedProperty.id, propertyData);
      const updatedProperties = properties.map(p => 
        p.id === selectedProperty.id ? updatedProperty : p
      );
      setProperties(updatedProperties);
      setShowAddProperty(false);
      setIsEditing(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError('Failed to update property');
      console.error('Update property error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    setLoading(true);
    try {
      await ApiService.deleteProperty(id);
      setProperties(properties.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete property');
      console.error('Delete property error:', err);
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
    setSelectedFiles([]);
  };

  const handleRefresh = () => {
    loadInitialData();
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

  // Error Alert Component
  const ErrorAlert = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 shadow-lg z-50">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <span className="text-red-800">{message}</span>
      <button onClick={onClose} className="text-red-600 hover:text-red-800">
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  // Loading Overlay Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-3 shadow-lg">
        <Loader className="h-6 w-6 animate-spin text-blue-600" />
        <span className="text-gray-900">Loading...</span>
      </div>
    </div>
  );

  // Navigation Sidebar
  const Sidebar = () => (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">HomeSphere</h1>
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
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <img 
              src={agentData?.avatar || '/api/placeholder/40/40'} 
              alt={agentData?.name || 'Agent'}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-gray-900">{agentData?.name || 'Loading...'}</div>
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
          value: agentData?.totalProperties || properties.length, 
          icon: Building, 
          color: 'blue',
          change: '+12%'
        },
        { 
          label: 'Active Listings', 
          value: agentData?.activeListing || properties.filter(p => p.status === 'active').length, 
          icon: Home, 
          color: 'green',
          change: '+8%'
        },
        { 
          label: 'Properties Sold', 
          value: agentData?.sold || properties.filter(p => p.status === 'sold').length, 
          icon: TrendingUp, 
          color: 'purple',
          change: '+23%'
        },
        { 
          label: 'Total Revenue', 
          value: agentData?.revenue || '₦0', 
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
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
              >
                {uploadingImages ? 'Uploading...' : 'Choose Files'}
              </label>
              {selectedFiles.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedFiles.length} file(s) selected
                </p>
              )}
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
              <option value="sold">Sold</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={isEditing ? handleUpdateProperty : handleAddProperty}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </div>
    </div>
  );

  // Main render function
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8">
          {activeTab === 'properties' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="px-4 py-2 border border-gray-300 rounded-lg"
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
                <button
                  onClick={() => setShowAddProperty(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  <Plus className="inline mr-2" /> Add Property
                </button>
              </div>

              <StatsCards />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-xl shadow-sm border p-4">
                    <img
                      src={property.images[0] || '/api/placeholder/400/300'}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                    <p className="text-blue-600 font-bold mb-2">{formatPrice(property.price)}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>{property.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditProperty(property)}>
                          <Edit3 className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={() => handleDeleteProperty(property.id)}>
                          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <div className="text-gray-700">
              <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
              {/* Placeholder or actual analytics data rendering */}
              <pre>{JSON.stringify(analytics, null, 2)}</pre>
            </div>
          )}

          {/* More tabs like 'inquiries', 'profile', 'settings' can be added here */}
        </main>
      </div>

      {showAddProperty && <PropertyForm />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default AgentDashboard;