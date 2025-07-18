// src/pages/PartagerDocument.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PartagerDocument.css";

export default function PartagerDocument() {
  const [docId, setDocId] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docId || !receiverAddress) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Appel au smart contract ici pour partager le document par ID
    console.log("Document partagé:", { docId, receiverAddress });
    alert("Document partagé avec succès !");
    // Reset form
    setDocId("");
    setReceiverAddress("");
  };

  return (
    <div className="share-page">
      <Link to="/dashboard" className="back-button">↩️</Link>
      <div className="share-card">
        <h2>Partager un document</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="docId">Numéro du document (ID)</label>
          <input
            id="docId"
            type="text"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
          />

          <label htmlFor="receiver">Adresse Ethereum du destinataire</label>
          <input
            id="receiver"
            type="text"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
          />

          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
}
