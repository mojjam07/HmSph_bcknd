import React from 'react';
import { Building, Home, Users, MessageSquare, Star, CreditCard, AlertTriangle, Bell, Settings } from 'lucide-react';

const Navigation = ({ activeView, setActiveView }) => (
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

export default Navigation;
