import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Profil', path: '/profile' },
  { name: 'Documents', path: '/documents' },
  { name: 'Partage', path: '/share' },
  { name: 'Historique', path: '/history' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Titre */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo DIMS"
            className="w-6 h-6 max-w-[1.5rem] max-h-[1.5rem] object-contain block"
          />
          <span className="text-3xl font-extrabold tracking-wide">DIMS</span>
        </Link>

        {/* Liens de navigation visibles partout */}
        <ul className="flex gap-12 text-xl font-semibold list-none">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`hover:text-gray-300 transition duration-200 ${
                  location.pathname === path
                    ? 'underline underline-offset-4 decoration-2'
                    : ''
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
