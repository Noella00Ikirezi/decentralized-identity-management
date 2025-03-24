import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Decentralized Identity Manager</h1>
      <p>Manage your digital identity with security and control.</p>
      <button onClick={() => navigate("/login")}>Get Started</button>
    </div>
  );
};

export default Home;
