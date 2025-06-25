// Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import './Register.css';
import { getAttribute } from '../services/identityService';

const Register = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIdentity = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setAccount(address);
        setError('');

        const nameHash = ethers.keccak256(ethers.toUtf8Bytes("profile"));
        const res = await getAttribute(address, nameHash);
        const { value } = res.data;

        if (value) {
          setAlreadyRegistered(true);
        }
      } catch (err) {
        console.error(err);
        if (!account) setError("Connexion MetaMask impossible.");
      }
    };

    checkIdentity();
  }, []);

  const handleContinue = () => {
    navigate('/profile');
  };

  return (
    <div className="register-container">
      <h2>Créer un compte</h2>
      <p>Adresse connectée : {account || 'Non connectée'}</p>

      {alreadyRegistered ? (
        <>
          <p className="info">Un profil est déjà associé à cette adresse.</p>
          <button className="btn" onClick={handleContinue}>Accéder à mon profil</button>
        </>
      ) : (
        <>
          <p>Bienvenue ! Vous pouvez maintenant enregistrer votre profil.</p>
          <button className="btn" onClick={handleContinue}>Créer mon profil</button>
        </>
      )}

      {error && !account && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
