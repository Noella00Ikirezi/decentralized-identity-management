import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirige vers la page Login qui déclenchera la connexion MetaMask
    navigate('/login');
  };

  return (
    <div className="home">
      <h1>Bienvenue sur DIMS</h1>
      <p>Votre identité décentralisée, sécurisée et accessible.</p>
      <div className="home-buttons">
        <button className="btn" onClick={() => navigate('/register')}>Créer mon profil</button>
        <button className="btn" onClick={handleLoginClick}>Se connecter</button>
      </div>
    </div>
  );
};

export default Home;

