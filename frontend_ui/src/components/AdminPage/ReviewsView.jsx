import React from 'react';
import { Star, Check, X } from 'lucide-react';

const ReviewsView = ({ reviews, agents }) => (
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

export default ReviewsView;
