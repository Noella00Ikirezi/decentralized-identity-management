import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ethers } from "ethers";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { account } = useAuth();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const bal = await provider.getBalance(account);
        setBalance(ethers.formatEther(bal));
      }
    };

    fetchBalance();
  }, [account]);

  const getAccountLabel = () => {
    if (account?.toLowerCase().startsWith("0x4637")) return "Noella";
    if (account?.toLowerCase().startsWith("0x8db3")) return "DIMS";
    return account?.slice(0, 6) + "..." + account?.slice(-4);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="avatar-placeholder">👤</div>
        <div className="account-info">
          <p className="account-label">{getAccountLabel()}</p>
          <p className="account-balance">{parseFloat(balance).toFixed(4)} ETH</p>
        </div>

        <Link to="/mes-documents">
          <button className="dashboard-btn">Mes Documents 📄</button>
        </Link>

        <Link to="/add-document">
          <button className="dashboard-btn">Ajouter un Document ➕</button>
        </Link>

        <Link to="/partage">
          <button className="dashboard-btn">Gérer les accès 👥</button>
        </Link>

        <Link to="/partager-document">
          <button className="dashboard-btn">Partager un Document 🔗</button>
        </Link>

        <Link to="/historique-partage">
          <button className="dashboard-btn">Historique des accès 👁️</button>
        </Link>
      </div>
    </div>
  );
}
