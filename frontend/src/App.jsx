// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import StoreDocument from "./components/StoreDocument";
import MyDocuments from "./components/MyDocuments";
import { useAccount } from "./contexts/AccountContext";

const App = () => {
  const { account } = useAccount();  // Get account status from context

  return (
    <>
      <Navbar />
      <div>
        {account ? (
          <h2>Bienvenue, {account}</h2>
        ) : (
          <h2>Veuillez vous connecter avec MetaMask</h2>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/store" element={<StoreDocument />} />
        <Route path="/documents" element={<MyDocuments />} />
      </Routes>
    </>
  );
};

export default App;
