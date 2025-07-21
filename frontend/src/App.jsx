import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MesDocuments from "./pages/MesDocuments";
import AddDocument from "./pages/AddDocument";
import GererAcces from "./pages/GererAcces";
import PartagerDocument from "./pages/PartagerDocument";
import HistoriquePartage from "./pages/HistoriquePartage";

function PrivateRoute({ element }) {
  const { account } = useAuth();
  return account ? element : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/mes-documents" element={<PrivateRoute element={<MesDocuments />} />} />
      <Route path="/add-document" element={<PrivateRoute element={<AddDocument />} />} />
      <Route path="/gerer-acces" element={<PrivateRoute element={<GererAcces />} />} />
      <Route path="/partager-document" element={<PrivateRoute element={<PartagerDocument />} />} />
      <Route path="/historique-partage" element={<PrivateRoute element={<HistoriquePartage />} />} />
    </Routes>
  );
}
