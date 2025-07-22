import React, { useEffect, useState } from 'react';
import { fetchDocuments } from "../services/ethersService";
import { Link } from 'react-router-dom';
import '../styles/MesDocuments.css';

function MesDocuments() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const result = await fetchDocuments();
        setDocs(result);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des documents :", err);
      }
    };

    loadDocs();
  }, []);

  return (
    <div className="docs-container">
      <div className="docs-header">
        <h2 className="docs-title">
          <span role="img" aria-label="Documents">📄</span> Mes Documents
        </h2>
        <a className="add-btn" href="/ajouter">Ajouter</a>
      </div>

      <div className="docs-grid">
        {docs.length === 0 ? (
          <p>Aucun document pour l'instant.</p>
        ) : (
          docs.map((doc, idx) => (
            <div key={idx} className="doc-card">
              <h3>{doc.title || "Sans titre"}</h3>
              <p><strong>Type :</strong> {doc.docType || "Inconnu"}</p>
              <p><strong>MIME :</strong> {doc.mimeType}</p>
              <p><strong>Ajouté le :</strong> {new Date(Number(doc.uploadedAt) * 1000).toLocaleString()}</p>
              <p><strong>CID :</strong>
                <a href={`https://ipfs.io/ipfs/${doc.cid}`} target="_blank" rel="noopener noreferrer">
                  {doc.cid.slice(0, 12)}...
                </a>
              </p>
              {doc.revoked && <span className="revoked">⛔ Révoqué</span>}
              <span className="doc-icon" role="img" aria-label="Folder">📁</span>
            </div>
          ))
        )}
      </div>

      <a href="/" className="back-btn">←</a>
    </div>
  );
}

export default MesDocuments;
