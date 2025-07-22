import React, { useEffect, useState } from 'react';
import { getAllShareLogs } from '../services/ethersService'; // à implémenter
import '../styles/HistoriquePartage.css';

function HistoriquePartage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const result = await getAllShareLogs(); // 🔄 Charge tous les logs
        console.log("📜 Historique chargé :", result);
        setLogs(result);
      } catch (err) {
        console.error("❌ Erreur chargement logs :", err);
      }
    };

    loadLogs();
  }, []);

  return (
    <div className="historique-page">
      <a className="back-button" href="/">←</a>
      <div className="historique-container">
        <h2>
          <span role="img" aria-label="historique">📜</span> Historique de Partage (tous documents)
        </h2>
        <table className="historique-table">
          <thead>
            <tr>
              <th>📄 Document</th>
              <th>👤 Propriétaire</th>
              <th>👥 Destinataire</th>
              <th>📅 Expiration</th>
              <th>⛔ Révoqué</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry, index) => (
              <tr key={index}>
                <td>{entry.docIndex}</td>
                <td><code>{entry.owner}</code></td>
                <td><code>{entry.sharedWith}</code></td>
                <td>{new Date(entry.expiresAt * 1000).toLocaleString()}</td>
                <td>{entry.revoked ? 'Oui' : 'Non'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoriquePartage;
