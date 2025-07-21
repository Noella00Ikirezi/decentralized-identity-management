import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/GererAcces.css";

export default function GererAcces() {
  const { account } = useAuth();
  const [sharedDocs, setSharedDocs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const userDocs = await axios.get("http://localhost:5000/documents/my", {
          headers: { "x-wallet-address": account }
        });

        const allShares = [];
        for (let i = 0; i < userDocs.data.length; i++) {
          const shares = await axios.get(`http://localhost:5000/documents/shared/${i}`, {
            headers: { "x-wallet-address": account }
          });

          shares.data.forEach((s) => {
            allShares.push({ docId: i, ...s });
          });
        }

        setSharedDocs(allShares);
      } catch (err) {
        console.error("❌ Erreur fetch shared access :", err);
        setMessage("Erreur lors du chargement.");
      }
    };

    fetchShares();
  }, [account]);

  const revoke = async (docId, sharedWith) => {
    try {
      await axios.post("http://localhost:5000/documents/revoke-share", {
        docId,
        recipient: sharedWith,
      }, {
        headers: { "x-wallet-address": account }
      });

      setSharedDocs((prev) =>
        prev.map((s) =>
          s.docId === docId && s.sharedWith === sharedWith ? { ...s, revoked: true } : s
        )
      );
    } catch (err) {
      console.error("❌ Erreur de révocation :", err);
      alert("Erreur lors de la révocation.");
    }
  };

  return (
    <div className="partage-page">
      <h1 className="title">📂 Accès partagés</h1>
      {message && <p>{message}</p>}

      <div className="documents-grid">
        {sharedDocs.map((s, index) => (
          <div key={index} className="doc-card">
            <p><strong>Doc ID : {s.docId}</strong></p>
            <p>Destinataire : {s.sharedWith}</p>
            <p>Expire : {new Date(s.expiresAt * 1000).toLocaleString()}</p>
            <p>État : {s.revoked ? "❌ Révoqué" : "✅ Actif"}</p>
            {!s.revoked && (
              <button onClick={() => revoke(s.docId, s.sharedWith)}>Révoquer</button>
            )}
          </div>
        ))}
      </div>

      <a href="/dashboard" className="back-button">↩️</a>
    </div>
  );
}
