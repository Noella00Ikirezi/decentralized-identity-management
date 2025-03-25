// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/store">Enregistrer un document</Link>
      <Link to="/documents">Mes documents</Link>
      <Link to="/profile">Mon Profil</Link>
    </nav>
  );
};

export default Navbar;
