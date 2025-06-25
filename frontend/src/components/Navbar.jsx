import React from 'react';
import { Link } from 'react-router-dom';
//import logo.png from /assets

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DIMS</Link>
      </div>
      <ul className="navbar-links">
        
      </ul>
    </nav>
  );
};

export default Navbar;
