// src/components/Auth.jsx
import React, { useEffect } from 'react';
import '../styles/Auth.css';
import { useAuth } from '../context/AuthContext';
import { connectWallet, checkWalletConnection, onWalletChange } from '../services/walletService';

function Auth() {
  const { account, setAccount } = useAuth();

  const handleConnect = async () => {
    try {
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
    } catch (error) {
      alert("Connexion MetaMask échouée : " + error.message);
    }
  };

  useEffect(() => {
    const autoLogin = async () => {
      const existingAccount = await checkWalletConnection();
      if (existingAccount) {
        setAccount(existingAccount);
      }
    };

    autoLogin();
    onWalletChange((newAccount) => {
      setAccount(newAccount);
    });
  }, [setAccount]);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">DIMS</div>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {account ? (
            <p>
              <span role="img" aria-label="check mark">✅</span> Connecté : {account}
            </p>
          ) : (
            <button type="button" onClick={handleConnect}>
              Se connecter avec MetaMask
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Auth;
