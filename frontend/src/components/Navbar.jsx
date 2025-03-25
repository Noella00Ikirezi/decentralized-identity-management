import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">DIMS</h1>
      <ul className="flex space-x-6 text-sm">
        <li>
          <Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
        </li>
        <li>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profil</Link>
        </li>
        <li>
          <Link to="/store" className="text-gray-700 hover:text-blue-600">Ajouter</Link>
        </li>
        <li>
          <Link to="/documents" className="text-gray-700 hover:text-blue-600">Documents</Link>
        </li>
        <li>
          <Link to="/qrcode" className="text-gray-700 hover:text-blue-600">QR Code</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;