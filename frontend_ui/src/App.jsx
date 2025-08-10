import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import PropertiesPage from './components/OtherPages/Properties';
import AgentsPage from './components/OtherPages/AgentList';
import AboutPage from './components/OtherPages/About';
import ContactPage from './components/OtherPages/Contact';
import Reviews from './components/OtherPages/Reviews';
import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main>
          <Routes>
            {/* Public Pages */}
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            <Route 
              path="/properties" 
              element={<PropertiesPage />} 
            />
            <Route 
              path="/agents" 
              element={<AgentsPage />} 
            />
            <Route 
              path="/reviews" 
              element={<Reviews />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage />} 
            />
            
            {/* Auth Pages */}
            <Route 
              path="/login" 
              element={<Login />} 
            />
            
            {/* Protected Pages */}
            <Route 
              path="/profile" 
              element={<Profile />} 
            />
            <Route 
              path="/admin/*" 
              element={<AdminDashboard />} 
            />
            <Route 
              path="/agent/*" 
              element={<AgentDashboard />} 
            />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
