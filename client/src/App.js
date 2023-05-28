import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import ManagePlayers from './components/ManagePlayers';
import ListPlayers from './components/ListPlayers';
import AddPlayer from './components/AddPlayer';
import StatusPlayers from './components/StatusPlayers';
import UpdatePlayer from './components/UpdatePlayer';
import Chat from "./components/Chat";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);

    if (socket) {
      socket.emit('leaveChat', { userName: user.userName });
      // Optionally disconnect the socket when logging out
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <div className="App">
      <div className="container d-flex justify-content-around align-items-center py-3">
        <h1>Team Manager</h1>
        {isAuthenticated && (
          <div className="d-flex justify-content-end align-items-center">
            <h2 className="m-3">Welcome {user ? (user.fullName ? user.fullName : user.userName) : 'Guest'}</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
      < Router >
        <nav>
          <ul>
            <li><Link to="/players/list"><span>Manage Players</span></Link></li>
            <li><Link to="/status/games"><span>Manage Status</span></Link></li>

            <li><Link to="/chat"><span>Chat-App</span></Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} setUser={setUser} socket={socket} setSocket={setSocket} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} setUser={setUser} />} />
          <Route path="/status/games" element={<StatusPlayers token={token} isAuthenticated={isAuthenticated} />} />
          {token ? (
            <>
              <Route path="/players/manage" element={<ManagePlayers />} />
              <Route path="/players/list" element={<><ManagePlayers /><ListPlayers token={token} /></>} />
              <Route path="/players/addplayer" element={<><ManagePlayers /><AddPlayer /></>} />
              <Route path="/players/edit/:id" element={<><ManagePlayers /><UpdatePlayer /></>} />
              <Route path="/chat" element={<Chat userName={user.userName} socket={socket} setSocket={setSocket} />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router >
    </div >
  );
}

export default App;
