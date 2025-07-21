import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/PartagerDocument.css";

export default function PartagerDocument() {
  const [docId, setDocId] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [duration, setDuration] = useState(""); // en secondes
  const [message, setMessage] = useState("");
  const { account } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!docId || !receiverAddress || !duration) {
      return setMessage("❌ Remplis tous les champs.");
    }

    try {
      const payload = {
        docId: Number(docId),
        recipient: receiverAddress,
        duration: Number(duration),
      };

      await axios.post("http://localhost:5000/documents/share", payload, {
        headers: {
          "x-wallet-address": account,
        },
      });

      setMessage("✅ Document partagé !");
      setDocId("");
      setReceiverAddress("");
      setDuration("");
    } catch (err) {
      console.error("❌ Erreur partage :", err);
      setMessage("❌ Échec du partage.");
    }
  };

  return (
    <div className="share-page">
      <Link to="/dashboard" className="back-button">↩️</Link>
      <div className="share-card">
        <h2>Partager un document</h2>
        <form onSubmit={handleSubmit}>
          <label>Numéro du document (ID)</label>
          <input type="number" value={docId} onChange={(e) => setDocId(e.target.value)} />

          <label>Adresse Ethereum du destinataire</label>
          <input type="text" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />

          <label>Durée du partage (en secondes)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

          <button type="submit">Partager</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
