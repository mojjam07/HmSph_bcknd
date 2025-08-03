import React from 'react';
import { Plus, Eye, MessageSquare, Edit3, Heart } from 'lucide-react';

const ListingsView = ({ listings, setSelectedListing }) => (
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
              <span className="mr-1">📍</span>
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

export default ListingsView;
