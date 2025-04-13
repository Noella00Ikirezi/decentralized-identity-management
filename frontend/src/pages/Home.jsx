import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        Bienvenue sur <span className="text-purple-200">DIMS</span>
      </h1>
      <p className="text-lg leading-relaxed text-purple-100 mb-8">
        Gérer vos identités et documents de façon <strong>sécurisée</strong>, <strong>décentralisée</strong> et <strong>moderne</strong>.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/profile"
          className="bg-white text-purple-800 font-semibold px-6 py-3 rounded-xl hover:bg-purple-100 transition"
        >
          Créer mon profil
        </Link>
        <Link
          to="/documents"
          className="border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-purple-800 transition"
        >
          Gérer mes documents
        </Link>
      </div>
    </div>
  );
};

export default Home;
