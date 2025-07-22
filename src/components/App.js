// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
import MesDocuments from './MesDocuments';
import AddDocument from './AddDocument';
import PartagerDocument from './PartagerDocument';
import GererAcces from './GererAcces';
import HistoriquePartage from './HistoriquePartage';
import { useAuth } from '../context/AuthContext'; 

function App() {
  const { account } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  // 🔄 Redirige automatiquement vers /dashboard après connexion
  useEffect(() => {
    if (account && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [account, location.pathname, navigate]);

  // 🔐 Redirige vers / si non connecté
  useEffect(() => {
    if (!account && location.pathname !== '/') {
      navigate('/');
    }
  }, [account, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Auth />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mes-documents" element={<MesDocuments />} />
      <Route path="/ajouter" element={<AddDocument />} />
      <Route path="/partager" element={<PartagerDocument />} />
      <Route path="/gerer-acces" element={<GererAcces />} />
      <Route path="/historique" element={<HistoriquePartage />} />
    </Routes>
  );
}

export default App;
