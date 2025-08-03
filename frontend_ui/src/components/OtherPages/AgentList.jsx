import React, { useState, useEffect } from 'react';
import Navigation from '../LandingPage/Navigation';
import Footer from '../LandingPage/Footer';
import { Search, MapPin, Star, Phone, Mail, MessageCircle, Award, Users, Home } from 'lucide-react';

const AgentsPage = ({ onLogin, token, user }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Sample data for demo
  useEffect(() => {
    const sampleAgents = [
      {
        id: 1,
        name: "Sarah Johnson",
        title: "Senior Real Estate Agent",
        email: "sarah.johnson@homesphere.com",
        phone: "+234 803 123 4567",
        location: "Lagos",
        specialties: ["Luxury Homes", "Commercial Properties"],
        rating: 4.9,
        reviews: 127,
        propertiesSold: 89,
        yearsExperience: 8,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
        bio: "Sarah specializes in luxury residential and commercial properties in Lagos. With 8 years of experience, she has helped over 200 clients find their perfect homes.",
        achievements: ["Top Agent 2023", "Client Choice Award", "Million Dollar Club"],
        languages: ["English", "Yoruba", "French"]
      },
      {
        id: 2,
        name: "Michael Adebayo",
        title: "Property Investment Specialist",
        email: "michael.adebayo@homesphere.com",
        phone: "+234 806 789 0123",
        location: "Abuja",
        specialties: ["Investment Properties", "Land Development"],
        rating: 4.8,
        reviews: 98,
        propertiesSold: 76,
        yearsExperience: 6,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        bio: "Michael focuses on investment opportunities and land development projects. He helps clients build wealth through strategic property investments.",
        achievements: ["Investment Expert 2023", "Rising Star Award"],
        languages: ["English", "Hausa", "Igbo"]
      },
      {
        id: 3,
        name: "Folake Ogundimu",
        title: "Residential Property Expert",
        email: "folake.ogundimu@homesphere.com",
        phone: "+234 809 456 7890",
        location: "Lagos",
        specialties: ["Residential Homes", "First-Time Buyers"],
        rating: 4.9,
        reviews: 154,
        propertiesSold: 112,
        yearsExperience: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        bio: "Folake is passionate about helping families find their dream homes. She specializes in residential properties and guiding first-time buyers through the process.",
        achievements: ["Customer Service Excellence", "New Agent of the Year 2020"],
        languages: ["English", "Yoruba"]
      },
      // Add more sample agents...
    ];
    
    setTimeout(() => {
      setAgents(sampleAgents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.specialties.some(specialty => 
                            specialty.toLowerCase().includes(searchQuery.toLowerCase())
                          );
    
    const matchesLocation = selectedLocation === 'all' || agent.location === selectedLocation;
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            agent.specialties.some(specialty => 
                              specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
                            );
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onShowRegistration={() => {}} onShowLogin={() => {}} token={token} user={user} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Agents</h1>
            <p className="text-xl opacity-90">Connect with experienced professionals who understand your needs</p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search agents by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="all">All Locations</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>
                <div>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="all">All Specialties</option>
                    <option value="luxury">Luxury Homes</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Agents Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading agents...' : `${filteredAgents.length} Agents Available`}
          </h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <div className="h-6 bg-gray-300 rounded mb-2 w-32"></div>
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="p-6">
                  {/* Agent Header */}
                  <div className="flex items-center mb-4">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-gray-600">{agent.title}</p>
                    </div>
                  </div>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {renderStars(agent.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {agent.rating} ({agent.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{agent.location}</span>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{agent.bio}</p>
                  
                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Home className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{agent.propertiesSold}</div>
                      <div className="text-xs text-gray-600">Sold</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{agent.yearsExperience}</div>
                      <div className="text-xs text-gray-600">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{agent.reviews}</div>
                      <div className="text-xs text-gray-600">Reviews</div>
                    </div>
                  </div>
                  
                  {/* Contact Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AgentsPage;