import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DIMS</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/profile">Mon Profil</Link></li>
        <li><Link to="/documents">Mes Documents</Link></li>
        <li><Link to="/share">Partager</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
