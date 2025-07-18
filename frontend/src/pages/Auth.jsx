// src/pages/Auth.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Auth.css";

export default function Auth() {
  const { account, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) navigate("/dashboard");
  }, [account, navigate]);

  const handleConnect = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">DIM</div>
        <form className="auth-form" onSubmit={handleConnect}>
          <p>Se connecter avec MetaMask</p>
          <button type="submit">Connexion MetaMask</button>
        </form>
      </div>
    </div>
  );
}
