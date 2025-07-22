import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const { account, setAccount } = useAuth();
  const navigate = useNavigate();

  // 🔁 Mise à jour du compte MetaMask
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          navigate("/"); // ✅ Correction ici
        }
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }
  }, [setAccount, navigate]);

  const handleLogout = () => {
    setAccount(null);
    navigate("/"); // ✅ Correction ici aussi
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="avatar-placeholder">
          <span role="img" aria-label="Avatar">👤</span>
        </div>

        <div className="account-info">
          <div className="account-label">Adresse connectée :</div>
          <div className="account-balance">{account || "Non connectée"}</div>
        </div>

        <Link to="/mes-documents"><button className="dashboard-btn">📄 Mes Documents</button></Link>
        <Link to="/ajouter"><button className="dashboard-btn">➕ Ajouter un Document</button></Link>
        <Link to="/partager"><button className="dashboard-btn">🔗 Partager</button></Link>
        <Link to="/gerer-acces"><button className="dashboard-btn">🔒 Gérer Accès</button></Link>
        <Link to="/historique"><button className="dashboard-btn">📜 Historique de Partage</button></Link>

        <button className="dashboard-btn" onClick={handleLogout} style={{ backgroundColor: '#e74c3c' }}>
          🚪 Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
