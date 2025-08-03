import React, { useState, useEffect } from 'react';
import Navigation from '../LandingPage/Navigation';
import Footer from '../LandingPage/Footer';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, ChevronDown } from 'lucide-react';

const PropertiesPage = ({ onLogin, token, user }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Sample data for demo
  useEffect(() => {
    const sampleListings = [
      {
        id: 1,
        title: "Luxury Villa in Lekki",
        description: "Modern 5-bedroom villa with private pool and garden",
        price: { amount: 150000000, currency: "NGN" },
        location: { address: "Lekki Phase 1, Lagos", city: "Lagos", state: "Lagos" },
        propertyType: "house",
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
        featured: true,
        dateAdded: new Date('2024-01-15')
      },
      {
        id: 2,
        title: "Executive Apartment in Victoria Island",
        description: "3-bedroom serviced apartment with ocean view",
        price: { amount: 75000000, currency: "NGN" },
        location: { address: "Victoria Island, Lagos", city: "Lagos", state: "Lagos" },
        propertyType: "apartment",
        bedrooms: 3,
        bathrooms: 3,
        area: 200,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
        featured: false,
        dateAdded: new Date('2024-01-10')
      },
      {
        id: 3,
        title: "Commercial Office Space",
        description: "Modern office space in business district",
        price: { amount: 200000000, currency: "NGN" },
        location: { address: "Ikoyi, Lagos", city: "Lagos", state: "Lagos" },
        propertyType: "commercial",
        bedrooms: 0,
        bathrooms: 4,
        area: 800,
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
        featured: true,
        dateAdded: new Date('2024-01-20')
      },
      // Add more sample listings...
    ];
    
    setTimeout(() => {
      setListings(sampleListings);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleFavorite = (listingId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId);
      } else {
        newFavorites.add(listingId);
      }
      return newFavorites;
    });
  };

  // Filter and sort listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPropertyType = selectedPropertyType === 'all' || listing.propertyType === selectedPropertyType;
    
    let matchesPriceRange = true;
    if (priceRange === 'under50') {
      matchesPriceRange = listing.price.amount < 50000000;
    } else if (priceRange === '50to100') {
      matchesPriceRange = listing.price.amount >= 50000000 && listing.price.amount <= 100000000;
    } else if (priceRange === 'over100') {
      matchesPriceRange = listing.price.amount > 100000000;
    }
    
    return matchesSearch && matchesPropertyType && matchesPriceRange;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price.amount - b.price.amount;
      case 'price-high':
        return b.price.amount - a.price.amount;
      case 'newest':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'oldest':
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      default:
        return 0;
    }
  });

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onShowRegistration={() => {}} onShowLogin={() => {}} token={token} user={user} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
            <p className="text-xl opacity-90">Discover premium properties across Nigeria</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by location, property type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Filter className="h-5 w-5" />
                    Filters
                  </button>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>
              
              {/* Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <select
                        value={selectedPropertyType}
                        onChange={(e) => setSelectedPropertyType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="all">All Types</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="all">All Prices</option>
                        <option value="under50">Under ₦50M</option>
                        <option value="50to100">₦50M - ₦100M</option>
                        <option value="over100">Over ₦100M</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading properties...' : `${filteredListings.length} Properties Found`}
          </h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(listing.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {listing.featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {listing.title}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(listing.price.amount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location.address}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {listing.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{listing.bedrooms} bed</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{listing.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{listing.area} sqm</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;