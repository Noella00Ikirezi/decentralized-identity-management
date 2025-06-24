import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ethers } from 'ethers';

const Login = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialisation
  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        setError("🦊 MetaMask n'est pas installé.");
        return;
      }

      const _provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(_provider);

      try {
        const accounts = await _provider.send('eth_accounts', []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la vérification de la connexion à MetaMask.');
      }
    };

    init();
  }, []);

  // Connexion manuelle
  const connectWallet = async () => {
    try {
      if (!provider) {
        setError('Fournisseur MetaMask introuvable.');
        return;
      }

      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setError('');
        navigate('/register');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Connexion refusée ou erreur MetaMask.');
    }
  };

  const changeAccount = async () => {
    setAccount(null);
    await connectWallet(); // Réaffiche la popup
  };

  return (
    <div className="login">
      <h2>Connexion avec MetaMask</h2>

      {!account ? (
        <>
          <p>Veuillez vous connecter avec MetaMask pour continuer.</p>
          <button className="btn" onClick={connectWallet}>🔐 Se connecter</button>
        </>
      ) : (
        <>
          <p>✅ Connecté : <strong>{account}</strong></p>
          <button className="btn secondary" onClick={changeAccount}>🔄 Changer de compte</button>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
