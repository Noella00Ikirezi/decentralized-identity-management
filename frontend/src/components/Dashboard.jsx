import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bienvenue dans votre Identité Décentralisée (DIMS)</h1>

      <nav className="mb-6 flex gap-4 text-sm text-blue-600">
        <Link to="/" className="hover:underline">Accueil</Link>
        <Link to="/profile" className="hover:underline">Profil</Link>
        <Link to="/store" className="hover:underline">Ajouter</Link>
        <Link to="/documents" className="hover:underline">Documents</Link>
        <Link to="/qrcode" className="hover:underline">QR Code</Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/profile" className="p-4 bg-white border rounded shadow hover:bg-gray-50">
          <h3 className="text-lg font-semibold">🧑 Mon Profil</h3>
          <p className="text-sm text-gray-600">Voir votre DID, propriétaire et attributs</p>
        </Link>

        <Link to="/store" className="p-4 bg-white border rounded shadow hover:bg-gray-50">
          <h3 className="text-lg font-semibold">📤 Ajouter un document</h3>
          <p className="text-sm text-gray-600">Uploader un document sur IPFS</p>
        </Link>

        <Link to="/documents" className="p-4 bg-white border rounded shadow hover:bg-gray-50">
          <h3 className="text-lg font-semibold">📂 Mes documents</h3>
          <p className="text-sm text-gray-600">Consulter vos documents enregistrés</p>
        </Link>

        <Link to="/qrcode" className="p-4 bg-white border rounded shadow hover:bg-gray-50">
          <h3 className="text-lg font-semibold">📱 QR Code</h3>
          <p className="text-sm text-gray-600">Générer un QR Code à partir d’un CID</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;