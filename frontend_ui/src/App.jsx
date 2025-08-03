import { useState } from 'react';
// import './s.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import PropertiesPage from './components/OtherPages/Properties';
import AgentsPage from './components/OtherPages/AgentList';
import AboutPage from './components/OtherPages/About';
import ContactPage from './components/OtherPages/Contact';
import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  // Common props for all pages
  const pageProps = {
    onLogin: handleLogin,
    onLogout: handleLogout,
    token,
    user
  };

  return (
      <div className="App">
        <main>
          <Routes>
            {/* Public Pages */}
            <Route 
              path="/" 
              element={<LandingPage {...pageProps} />} 
            />
            <Route 
              path="/properties" 
              element={<PropertiesPage {...pageProps} />} 
            />
            <Route 
              path="/agents" 
              element={<AgentsPage {...pageProps} />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage {...pageProps} />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage {...pageProps} />} 
            />
            
            {/* Auth Pages */}
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            
            {/* Protected Pages */}
            <Route 
              path="/profile" 
              element={token ? <Profile token={token} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/*" 
              element={token && user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/agent/*" 
              element={token && user && user.role === 'agent' ? <AgentDashboard /> : <Navigate to="/login" />} 
            />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
