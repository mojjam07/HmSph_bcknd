import { useState } from 'react';
import './App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import RegisterAgent from './components/RegisterAgent';
import RegisterAdmin from './components/RegisterAdmin';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';

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

  return (
      <div className="App">
        <nav>
          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registerUser">Register User</Link>
              <Link to="/registerAgent">Register Agent</Link>
              <Link to="/registerAdmin">Register Admin</Link>
            </>
          )}
          {token && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/admin">Admin Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          <Link to="/">Landing</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/registerUser" element={<RegisterUser />} />
            <Route path="/registerAgent" element={<RegisterAgent />} />
            <Route path="/registerAdmin" element={<RegisterAdmin />} />
            <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate to="/login" />} />
            <Route path="/admin/*" element={token ? <AdminDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
