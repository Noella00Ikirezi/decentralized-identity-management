import React, { useEffect, useState } from 'react';
import { fetchDocuments, shareDocument } from "../services/ethersService";
import '../styles/PartagerDocument.css';

function PartagerDocument() {
  const [selectedDocIndex, setSelectedDocIndex] = useState('');
  const [recipient, setRecipient] = useState('');
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const docs = await fetchDocuments();
        setDocuments(docs);
      } catch (err) {
        console.error("❌ Erreur chargement documents :", err);
      }
    };

    loadDocs();
  }, []);

  const handleShare = async () => {
    if (!selectedDocIndex || !recipient) return alert("Tous les champs sont requis");
    try {
      await shareDocument(selectedDocIndex, recipient);
      alert("✅ Document partagé !");
    } catch (err) {
      console.error("❌ Erreur lors du partage :", err);
      alert("Erreur lors du partage");
    }
  };

  return (
    <div className="share-page">
      <div className="share-card">
        <h2><span role="img" aria-label="lien">🔗</span> Partager un document</h2>

        <label>Choisir un document</label>
        <select
          className="custom-select"
          value={selectedDocIndex}
          onChange={(e) => setSelectedDocIndex(e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {documents.map((doc, index) => (
            <option key={index} value={index}>
              📄 {doc.title || "Sans titre"} (CID : {doc.cid.slice(0, 8)}…)
            </option>
          ))}
        </select>

        <label>Adresse Ethereum du destinataire</label>
        <input
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <button onClick={handleShare}>Partager</button>
        <a className="back-button" href="/">←</a>
      </div>
    </div>
  );
}

export default PartagerDocument;
