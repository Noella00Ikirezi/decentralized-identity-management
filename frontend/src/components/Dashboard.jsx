// components/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import { useAccount } from "../contexts/AccountContext";

const Dashboard = () => {
  const { account, network } = useAccount(); // Using the account context

  return (
    <div>
      <h1>Dashboard</h1>
      {account ? (
        <div>
          <p>Voici votre tableau de bord connecté avec l'adresse : {account}</p>
          <p>Connected to network: {network}</p>
          
          {/* Navigation Links */}
          <div>
            <h3>Explorez vos options :</h3>
            <ul>
              <li><Link to="/store">Enregistrer un document</Link></li>
              <li><Link to="/documents">Mes documents</Link></li>
              {/* You can add more links here as needed */}
            </ul>
          </div>
        </div>
      ) : (
        <p>Veuillez vous connecter avec MetaMask pour accéder au tableau de bord.</p>
      )}
    </div>
  );
};

export default Dashboard;
