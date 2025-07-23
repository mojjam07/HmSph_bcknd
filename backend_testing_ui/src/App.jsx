import { useState } from 'react';
import './App.css';
import RegisterUser from './components/RegisterUser';
import RegisterAgent from './components/RegisterAgent';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
// import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // default to landing page

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    setView('profile');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setView('landing');
  };

  return (
    <div className="App">
      <nav>
        {!token && (
          <>
            <button onClick={() => setView('login')}>Login</button>
            <button onClick={() => setView('registerUser')}>Register User</button>
            <button onClick={() => setView('registerAgent')}>Register Agent</button>
          </>
        )}
        {token && (
          <>
            <button onClick={() => setView('profile')}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <main>
        {view === 'landing' && <LandingPage onNavigate={setView} />}
        {view === 'login' && <Login onLogin={handleLogin} />}
        {view === 'registerUser' && <RegisterUser />}
        {view === 'registerAgent' && <RegisterAgent />}
        {view === 'profile' && <Profile token={token} />}
      </main>
    </div>
  );
}

export default App;
