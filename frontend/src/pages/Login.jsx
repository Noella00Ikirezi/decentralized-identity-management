import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ethers } from 'ethers';

const Login = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fonction de connexion manuelle
  const requestConnection = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('Connexion refusée ou erreur lors de la requête MetaMask.');
    }
  };

  // Détection automatique si MetaMask est déjà connecté
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (!window.ethereum) {
          setError("MetaMask n'est pas installé.");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_accounts', []); // pas de popup

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          navigate('/profile');
        } else {
          requestConnection(); // déclenche la popup une seule fois
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la vérification de MetaMask.');
      }
    };

    checkConnection();
  }, [navigate]);

  return (
    <div className="login">
      <h2>Connexion</h2>
      <p>Connexion via MetaMask en cours...</p>
      {account && <p>Connecté en tant que : {account}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
