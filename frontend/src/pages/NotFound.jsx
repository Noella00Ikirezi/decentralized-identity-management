// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-gray-700 text-lg mb-6">Page introuvable 😢</p>
      <Link to="/" className="text-indigo-600 hover:underline text-sm">
        Revenir à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
