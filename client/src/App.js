import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import ManagePlayers from './components/ManagePlayers';
import ListPlayers from './components/ListPlayers';
import AddPlayer from './components/AddPlayer';
import StatusPlayers from './components/StatusPlayers';
import UpdatePlayer from './components/UpdatePlayer';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="App">
      <h1>Team Manager</h1>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/players/list"><span>Manage Players</span> </Link></li>
            <li><Link to="/status/game/:id"><span>Manage Status</span> </Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/players/list" element={<><ManagePlayers setActiveTab={setActiveTab} /><ListPlayers activeTab={activeTab} /></>} />
          <Route path="/players/addplayer" element={<><ManagePlayers setActiveTab={setActiveTab} /><AddPlayer activeTab={activeTab} /></>} />
          <Route path="/status/game/:id" element={<StatusPlayers />} />
          <Route path="/" element={<Navigate to="/players/list" />} />
          <Route path="/players/edit/:id" element={<UpdatePlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
