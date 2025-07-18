import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MesDocuments.css";

export default function MesDocuments() {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/documents/my");
        const rawDocs = response.data;

        const formattedDocs = rawDocs.map((doc) => ({
          cid: doc.cid,
          mimeType: doc.mimeType,
          title: doc.title,
          docType: doc.docType,
          uploadedAt: new Date(Number(doc.uploadedAt) * 1000).toLocaleString(),
          revoked: doc.revoked,
        }));

        setDocuments(formattedDocs);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération :", err);
        setMessage("❌ Impossible de récupérer les documents depuis le backend.");
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-title">
          <span role="img" aria-label="document">📄</span> Mes documents
        </div>
        <a href="/add-document">
          <button className="add-btn">
            Ajouter <span role="img" aria-label="plus">➕</span>
          </button>
        </a>
      </div>

      {message && <p className="error-msg">{message}</p>}

      <div className="docs-grid">
        {documents.length === 0 ? (
          <p className="no-docs">Aucun document enregistré.</p>
        ) : (
          documents.map((doc, index) => (
            <div key={index} className="doc-card">
              <h4>{doc.title}</h4>
              <p>Type : {doc.docType}</p>
              <p>MIME : {doc.mimeType}</p>
              <p>Ajouté le : {doc.uploadedAt}</p>
              <p>
                Statut :{" "}
                <strong style={{ color: doc.revoked ? "red" : "green" }}>
                  {doc.revoked ? "Révoqué" : "Actif"}
                </strong>
              </p>
              <a
                href={`https://ipfs.io/ipfs/${doc.cid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Voir le document
              </a>
            </div>
          ))
        )}
      </div>

      <a href="/dashboard" className="back-btn" title="Retour">
        <span role="img" aria-label="retour">↩️</span>
      </a>
    </div>
  );
}
