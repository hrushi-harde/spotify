import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="logo">Spotify 2.0</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
