// src/pages/HistoriquePartage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/HistoriquePartage.css";

const historiqueData = [
  {
    nom: "CAF",
    destinataire: "0xA23a...9F2e",
    categorie: "Logement",
    date: "2025-07-14",
  },
  {
    nom: "Assurance Maladie",
    destinataire: "0x8FEd...32dB",
    categorie: "Dossier médical",
    date: "2025-07-10",
  },
  {
    nom: "Notaire Dupont",
    destinataire: "0x12aE...1c9D",
    categorie: "Identité / succession",
    date: "2025-07-01",
  },
];

export default function HistoriquePartage() {
  return (
    <div className="historique-page">
      <Link to="/dashboard" className="back-button">↩️</Link>
      <div className="historique-container">
        <h2>📄 Historique des partages</h2>
        <table className="historique-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Destinataire</th>
              <th>Catégorie</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historiqueData.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td>{item.destinataire}</td>
                <td>{item.categorie}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
