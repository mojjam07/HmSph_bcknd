import React, { useEffect, useState } from 'react';
import { 
  Search, MapPin, Bed, Bath, Square, Heart, Eye, Star, 
  Phone, Mail, Filter, ChevronDown, ArrowRight, Building,
  Home, TrendingUp, Users, Shield, Award, Play, X,
  Menu, Globe, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';

const LandingPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Sample data for demo - replace with your API call
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const sampleListings = [
            {
              listingId: '1',
              title: 'Luxury 4-Bedroom Duplex in Lekki Phase 1',
              description: 'Beautiful modern duplex with swimming pool, BQ, and premium finishes. Perfect for families seeking luxury living.',
              propertyType: 'house',
              location: { address: 'Lekki Phase 1, Lagos', area: 'Lekki' },
              price: { amount: 85000000, currency: '₦' },
              features: { bedrooms: 4, bathrooms: 5, size: '450sqm' },
              images: ['/api/placeholder/400/300'],
              agent: { name: 'John Doe', phone: '+234-801-234-5678', rating: 4.8 },
              analytics: { views: 245, favorites: 18 },
              isFeatured: true,
              isNew: false
            },
            {
              listingId: '2',
              title: '2-Bedroom Apartment in Victoria Island',
              description: 'Furnished apartment in prime location with ocean view and modern amenities.',
              propertyType: 'apartment',
              location: { address: 'Victoria Island, Lagos', area: 'VI' },
              price: { amount: 35000000, currency: '₦' },
              features: { bedrooms: 2, bathrooms: 3, size: '120sqm' },
              images: ['/api/placeholder/400/300'],
              agent: { name: 'Sarah Johnson', phone: '+234-802-567-8901', rating: 4.5 },
              analytics: { views: 89, favorites: 12 },
              isFeatured: false,
              isNew: true
            },
            {
              listingId: '3',
              title: '3-Bedroom Terraced House in Ikeja GRA',
              description: 'Spacious family home with garden, garage, and quiet neighborhood setting.',
              propertyType: 'house',
              location: { address: 'Ikeja GRA, Lagos', area: 'Ikeja' },
              price: { amount: 55000000, currency: '₦' },
              features: { bedrooms: 3, bathrooms: 4, size: '280sqm' },
              images: ['/api/placeholder/400/300'],
              agent: { name: 'Michael Chen', phone: '+234-803-789-0123', rating: 4.7 },
              analytics: { views: 156, favorites: 25 },
              isFeatured: true,
              isNew: false
            }
          ];
          setListings(sampleListings);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error fetching listings');
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const toggleFavorite = (listingId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(listingId)) {
      newFavorites.delete(listingId);
    } else {
      newFavorites.add(listingId);
    }
    setFavorites(newFavorites);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedPropertyType === 'all' || listing.propertyType === selectedPropertyType;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'under50' && listing.price.amount < 50000000) ||
                        (priceRange === '50to100' && listing.price.amount >= 50000000 && listing.price.amount <= 100000000) ||
                        (priceRange === 'over100' && listing.price.amount > 100000000);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const formatPrice = (amount) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">RealtyPro</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Premium Properties</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Properties</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Agents</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Properties</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Agents</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">About</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Contact</a>
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Login
              </button>
              <button className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div 
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/api/placeholder/1200/800")',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Discover premium properties in Nigeria's most desirable locations. 
              Your next home is just a search away.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, property type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="house">Houses</option>
                  <option value="apartment">Apartments</option>
                  <option value="land">Land</option>
                </select>
                
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                  Search
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { value: '2,847', label: 'Properties', icon: Building },
                { value: '1,200+', label: 'Happy Clients', icon: Users },
                { value: '98%', label: 'Success Rate', icon: TrendingUp },
                { value: '24/7', label: 'Support', icon: Shield }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Property Card Component
  const PropertyCard = ({ listing }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 space-x-2">
          {listing.isFeatured && (
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ Featured
            </span>
          )}
          {listing.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              🆕 New
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => toggleFavorite(listing.listingId)}
            className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
              favorites.has(listing.listingId) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <span className="text-lg font-bold">{formatPrice(listing.price.amount)}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">{listing.location.address}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center bg-gray-50 rounded-lg py-3 px-2">
            <Bed className="h-5 w-5 mx-auto mb-1 text-gray-400" />
            <div className="text-sm font-semibold text-gray-900">{listing.features.bedrooms}</div>
            <div className="text-xs text-gray-500">Beds</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg py-3 px-2">
            <Bath className="h-5 w-5 mx-auto mb-1 text-gray-400" />
            <div className="text-sm font-semibold text-gray-900">{listing.features.bathrooms}</div>
            <div className="text-xs text-gray-500">Baths</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg py-3 px-2">
            <Square className="h-5 w-5 mx-auto mb-1 text-gray-400" />
            <div className="text-sm font-semibold text-gray-900">{listing.features.size}</div>
            <div className="text-xs text-gray-500">Size</div>
          </div>
        </div>

        {/* Agent & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <img 
              src="/api/placeholder/40/40" 
              alt={listing.agent.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{listing.agent.name}</div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{listing.agent.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{listing.analytics.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{listing.analytics.favorites}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold transform hover:scale-105 duration-200">
            View Details
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Call</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RealtyPro?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive real estate solutions with cutting-edge technology and personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: 'Verified Properties',
              description: 'All listings are thoroughly verified for authenticity and legal compliance.',
              color: 'blue'
            },
            {
              icon: Users,
              title: 'Expert Agents',
              description: 'Work with certified real estate professionals with proven track records.',
              color: 'green'
            },
            {
              icon: TrendingUp,
              title: 'Market Insights',
              description: 'Access real-time market data and property valuation insights.',
              color: 'purple'
            },
            {
              icon: Award,
              title: '24/7 Support',
              description: 'Round-the-clock customer support for all your real estate needs.',
              color: 'yellow'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">RealtyPro</h1>
                <p className="text-gray-400 text-sm">Premium Properties</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters 
              with verified properties across Nigeria.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button key={index} className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors">
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <div className="space-y-3">
              {['About Us', 'Properties', 'Agents', 'Blog', 'Contact'].map((link) => (
                <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">+234-800-REALTY</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">info@realtypro.ng</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 RealtyPro. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      
      {/* Properties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
              <p className="text-xl text-gray-600">Discover our handpicked premium listings</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under ₦50M</option>
                <option value="50to100">₦50M - ₦100M</option>
                <option value="over100">Over ₦100M</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-xl font-medium text-gray-600">Loading amazing properties...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-600 text-xl font-medium mb-2">Oops! Something went wrong</div>
              <p className="text-red-500">{error}</p>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Try Again
              </button>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {filteredListings.map((listing) => (
                  <PropertyCard key={listing.listingId} listing={listing} />
                ))}
              </div>

              {filteredListings.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedPropertyType('all');
                      setPriceRange('all');
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View All Properties
                  </button>
                </div>
              )}

              {filteredListings.length > 0 && (
                <div className="text-center">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                    Load More Properties
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <FeaturesSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of satisfied customers who found their perfect property with RealtyPro. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                Browse Properties
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105">
                Become an Agent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest property listings and market insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;