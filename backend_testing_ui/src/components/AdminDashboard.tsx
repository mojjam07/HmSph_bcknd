import React, { useState } from 'react';
import { 
  User, Home, MessageSquare, Star, CreditCard, AlertTriangle, 
  Shield, Search, Heart, Eye, Phone, Mail, MapPin, Calendar,
  DollarSign, Camera, Video, Settings, Bell, Filter, Plus,
  Edit3, Trash2, Check, X, Upload, Building, Users
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  // Sample data
  const agents = [
    {
      agentId: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@realty.com',
      phone: '+234-801-234-5678',
      businessName: 'Prime Properties Lagos',
      licenseNumber: 'REL-2024-001',
      isVerified: true,
      verificationStatus: 'approved',
      subscriptionPlan: 'premium',
      currentMonthListings: 8,
      listingLimits: 25,
      profilePicture: '/api/placeholder/64/64'
    },
    {
      agentId: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@homes.ng',
      phone: '+234-802-567-8901',
      businessName: 'Elite Homes Nigeria',
      licenseNumber: 'REL-2024-002',
      isVerified: false,
      verificationStatus: 'pending',
      subscriptionPlan: 'basic',
      currentMonthListings: 3,
      listingLimits: 10,
      profilePicture: '/api/placeholder/64/64'
    }
  ];

  const listings = [
    {
      listingId: '1',
      agentId: '1',
      title: 'Luxury 4-Bedroom Duplex in Lekki Phase 1',
      description: 'Beautiful modern duplex with swimming pool and BQ',
      propertyType: 'house',
      location: { address: 'Lekki Phase 1, Lagos', area: 'Lekki' },
      price: 85000000,
      features: { bedrooms: 4, bathrooms: 5, parking: 2, size: '450sqm' },
      status: 'active',
      isPromoted: true,
      isFeatured: true,
      images: ['/api/placeholder/300/200'],
      videos: ['/api/placeholder/video1.mp4'],
      analytics: { views: 245, inquiries: 12, favorites: 8 }
    },
    {
      listingId: '2',
      agentId: '2',
      title: '2-Bedroom Apartment in Victoria Island',
      description: 'Furnished apartment in prime location',
      propertyType: 'apartment',
      location: { address: 'Victoria Island, Lagos', area: 'VI' },
      price: 35000000,
      features: { bedrooms: 2, bathrooms: 3, parking: 1, size: '120sqm' },
      status: 'active',
      isPromoted: false,
      isFeatured: false,
      images: ['/api/placeholder/300/200'],
      videos: [],
      analytics: { views: 89, inquiries: 4, favorites: 3 }
    }
  ];

  const leads = [
    {
      leadId: '1',
      listingId: '1',
      agentId: '1',
      contactMethod: 'email',
      message: 'Interested in viewing this property. Available this weekend?',
      status: 'new',
      source: 'listing_page',
      createdAt: '2024-07-20T10:30:00Z'
    }
  ];

  const reviews = [
    {
      reviewId: '1',
      agentId: '1',
      rating: 5,
      comment: 'Excellent service! John helped us find our dream home.',
      status: 'approved',
      createdAt: '2024-07-18T14:20:00Z'
    }
  ];

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RealtyPro</span>
            </div>
            <div className="flex space-x-4">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: Home },
                { key: 'agents', label: 'Agents', icon: Users },
                { key: 'listings', label: 'Listings', icon: Building },
                { key: 'leads', label: 'Leads', icon: MessageSquare },
                { key: 'reviews', label: 'Reviews', icon: Star },
                { key: 'payments', label: 'Payments', icon: CreditCard },
                { key: 'reports', label: 'Reports', icon: AlertTriangle }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveView(key)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-400" />
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );

  // Dashboard View
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">15,263</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-gray-900">436</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₦24.5M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
          </div>
          <div className="p-6 space-y-4">
            {listings.slice(0, 3).map((listing) => (
              <div key={listing.listingId} className="flex items-center space-x-4">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                  <p className="text-sm text-gray-500">₦{listing.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{listing.analytics.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Top Agents</h3>
          </div>
          <div className="p-6 space-y-4">
            {agents.map((agent) => (
              <div key={agent.agentId} className="flex items-center space-x-4">
                <img 
                  src={agent.profilePicture} 
                  alt={`${agent.firstName} ${agent.lastName}`}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {agent.firstName} {agent.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{agent.businessName}</p>
                </div>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agent.verificationStatus === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agent.verificationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Agents Management View
  const AgentsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Agents Management</h2>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents.map((agent) => (
                <tr key={agent.agentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={agent.profilePicture} 
                        alt=""
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {agent.firstName} {agent.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {agent.businessName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{agent.email}</div>
                    <div className="text-sm text-gray-500">{agent.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.verificationStatus === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.subscriptionPlan === 'premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agent.currentMonthListings}/{agent.listingLimits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedAgent(agent)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Listings Management View
  const ListingsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Listings Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Listing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.listingId} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img 
                src={listing.images[0]} 
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 space-x-2">
                {listing.isFeatured && (
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </span>
                )}
                {listing.isPromoted && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Promoted
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <button className="bg-white rounded-full p-2 shadow">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₦{listing.price.toLocaleString()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  listing.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {listing.status}
                </span>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                {listing.title}
              </h3>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{listing.location.address}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{listing.features.bedrooms} beds</span>
                <span>{listing.features.bathrooms} baths</span>
                <span>{listing.features.size}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{listing.analytics.views}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{listing.analytics.inquiries}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Leads Management View
  const LeadsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Converted</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => {
                const listing = listings.find(l => l.listingId === lead.listingId);
                const agent = agents.find(a => a.agentId === lead.agentId);
                
                return (
                  <tr key={lead.leadId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {lead.contactMethod === 'email' ? (
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        ) : (
                          <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.contactMethod} inquiry
                          </div>
                          <div className="text-sm text-gray-500">
                            From {lead.source}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{listing?.title}</div>
                      <div className="text-sm text-gray-500">₦{listing?.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {agent?.firstName} {agent?.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lead.status === 'new' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Contact
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Reviews Management View
  const ReviewsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reviews Management</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>All Reviews</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          {reviews.map((review) => {
            const agent = agents.find(a => a.agentId === review.agentId);
            
            return (
              <div key={review.reviewId} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={agent?.profilePicture} 
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-medium text-gray-900">
                          {agent?.firstName} {agent?.lastName}
                        </h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.status}
                    </span>
                    {review.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Payments View
  const PaymentsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>All Payments</option>
            <option>Successful</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₦24,500,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₦3,200,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">1,847</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  PAY-2024-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">john.doe@realty.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₦50,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Subscription
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Successful
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  July 20, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Reports View
  const ReportsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reports Management</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>All Reports</option>
            <option>Pending</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  RPT-2024-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Luxury 4-Bedroom Duplex</div>
                  <div className="text-sm text-gray-500">Lekki Phase 1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Fake Listing
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Anonymous User
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Investigating
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  July 19, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Review
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    Resolve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Agent Detail Modal
  const AgentModal = ({ agent, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Agent Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img 
              src={agent.profilePicture} 
              alt=""
              className="h-20 w-20 rounded-full"
            />
            <div>
              <h4 className="text-xl font-medium text-gray-900">
                {agent.firstName} {agent.lastName}
              </h4>
              <p className="text-gray-600">{agent.businessName}</p>
              <p className="text-sm text-gray-500">License: {agent.licenseNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {agent.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {agent.phone}
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Account Status</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Verification:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agent.verificationStatus === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agent.verificationStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subscription:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agent.subscriptionPlan === 'premium' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.subscriptionPlan}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Listing Statistics</h5>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{agent.currentMonthListings}</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{agent.listingLimits}</p>
                  <p className="text-sm text-gray-600">Limit</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((agent.currentMonthListings / agent.listingLimits) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Usage</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              Edit Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Listing Detail Modal
  const ListingModal = ({ listing, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Listing Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <img 
              src={listing.images[0]} 
              alt={listing.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{listing.title}</h4>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  ₦{listing.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{listing.location.address}</span>
              </div>

              <p className="text-gray-700">{listing.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium">{listing.features.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium">{listing.features.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking:</span>
                  <span className="font-medium">{listing.features.parking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{listing.features.size}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Status & Promotion</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    listing.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Featured:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    listing.isFeatured 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.isFeatured ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Promoted:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    listing.isPromoted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.isPromoted ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Analytics</h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{listing.analytics.views}</p>
                    <p className="text-sm text-gray-600">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{listing.analytics.inquiries}</p>
                    <p className="text-sm text-gray-600">Inquiries</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{listing.analytics.favorites}</p>
                    <p className="text-sm text-gray-600">Favorites</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Media</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Camera className="h-4 w-4 mr-2" />
                    <span>Images</span>
                  </div>
                  <span className="text-sm font-medium">{listing.images.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Video className="h-4 w-4 mr-2" />
                    <span>Videos</span>
                  </div>
                  <span className="text-sm font-medium">{listing.videos?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Edit Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'agents' && <AgentsView />}
        {activeView === 'listings' && <ListingsView />}
        {activeView === 'leads' && <LeadsView />}
        {activeView === 'reviews' && <ReviewsView />}
        {activeView === 'payments' && <PaymentsView />}
        {activeView === 'reports' && <ReportsView />}
      </main>

      {selectedAgent && (
        <AgentModal 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}

      {selectedListing && (
        <ListingModal 
          listing={selectedListing} 
          onClose={() => setSelectedListing(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;