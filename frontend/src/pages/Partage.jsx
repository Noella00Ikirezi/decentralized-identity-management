// src/pages/Partage.jsx
import React from "react";
import "../styles/Partage.css"; // à créer pour styliser proprement
import { Link } from "react-router-dom";

const documents = [
  { id: 1, nom: "Carte d'identité", type: "Pièce d'identité", date: "12/03/2033" },
  { id: 2, nom: "Permis de conduire", type: "Permis B", date: "15/09/2034" },
  { id: 3, nom: "Passeport", type: "Pièce d'identité", date: "20/07/2032" },
  // Ajoute les autres...
];

export default function Partage() {
  return (
    <div className="partage-page">
      <Link to="/dashboard" className="back-button">↩️</Link>
      <h1 className="title">Mes documents à partager</h1>
      <div className="documents-grid">
        {documents.map(doc => (
          <div key={doc.id} className="doc-card">
            <p><strong>{doc.nom}</strong></p>
            <p>{doc.type}</p>
            <p>{doc.date}</p>
            <div className="doc-actions">
              <span title="Partager">📤</span>
              <span title="Visualiser">👁️</span>
              <span title="Supprimer">🗑️</span>
              <Link to="/partager-document" title="Partager le document">🔗</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
