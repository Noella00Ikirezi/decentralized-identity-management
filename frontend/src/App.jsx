import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import StoreDocument from "./components/StoreDocument";
import MyDocuments from "./components/MyDocuments";
import QRCodeView from "./components/QRCodeView";
import Profile from "./components/Profile";
import { useAccount } from "./contexts/AccountContext";

const App = () => {
  const { address } = useAccount();

  return (
    <>
      <Navbar />
      <div className="p-4">
        {address ? (
          <p className="text-sm text-gray-600 mb-4">Connecté avec: <span className="font-mono">{address}</span></p>
        ) : (
          <p className="text-sm text-red-600 mb-4">Veuillez connecter votre wallet</p>
        )}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/store" element={<StoreDocument />} />
          <Route path="/documents" element={<MyDocuments />} />
          <Route path="/qrcode" element={<QRCodeView />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
