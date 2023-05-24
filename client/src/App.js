import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import ManagePlayers from './components/ManagePlayers';
import ListPlayers from './components/ListPlayers';
import AddPlayer from './components/AddPlayer';
import StatusPlayers from './components/StatusPlayers';
import UpdatePlayer from './components/UpdatePlayer';
import Chat from "./components/Chat";
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="App">
      <h1>Team Manager</h1>
      <Router>
        <nav>
          <ul>
            <li><Link to="/players/list"><span>Manage Players</span></Link></li>
            <li><Link to="/status/games"><span>Manage Status</span></Link></li>
            <li><Link to="/chat"><span>Chat-App</span></Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/status/games" element={<StatusPlayers isAuthenticated={isAuthenticated} />} />
          {token ? (
            <>
              <Route path="/players/manage" element={<ManagePlayers />} />
              <Route path="/players/list" element={<ListPlayers token={token} />} />
              <Route path="/players/addplayer" element={<AddPlayer />} />
              <Route path="/players/edit/:id" element={<UpdatePlayer />} />
              <Route path="/chat" element={<Chat />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
