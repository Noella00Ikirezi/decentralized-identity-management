import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login', { state: { from: 'home' } });
  };

  return (
    <div className="home">
      <h1>DIMS</h1>
      <h2>Identité Décentralisée & Sécurisée</h2>

      <div className="home-description">
        <p>
          Créez, gérez et partagez vos identités numériques sur la blockchain Ethereum.
        </p>
        <p>
          DIMS garantit l’intégrité, la confidentialité et l’accessibilité de vos données personnelles.
        </p>
        <p>
          Connectez-vous avec MetaMask pour commencer à gérer votre identité et vos documents.
        </p>
      </div>

      <div className="home-buttons">
        <button className="btn primary" onClick={() => navigate('/register')}>
          🚀 Créer mon profil
        </button>
        <button className="btn secondary" onClick={handleLoginClick}>
          🔐 Se connecter
        </button>
      </div>

      <div className="home-footer">
        <p>
          Besoin d’aide ? Consultez notre documentation ou contactez notre équipe.
        </p>
        <p>
          Rejoignez la communauté DIMS et découvrez la puissance des identités blockchain.
        </p>
      </div>
    </div>
  );
};

export default Home;
