import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm tracking-wide">
        &copy; {new Date().getFullYear()} <span className="font-bold">DIMS</span> — Gestion décentralisée d'identité.
        <br />
        Créé avec 💜 par les étudiants de l'ESGI
      </div>
    </footer>
  );
};

export default Footer;
