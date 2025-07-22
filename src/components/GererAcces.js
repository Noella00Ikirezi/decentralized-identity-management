import React, { useEffect, useState } from 'react';
import {
  fetchDocuments,
  revokeAccess,
  getMyShares,
  getSharedWithMe,
  initEthers,
  loadContract,
} from '../services/ethersService';
import '../styles/GererAcces.css';

function GererAcces() {
  const [account, setAccount] = useState('');
  const [docId, setDocId] = useState('');
  const [revokeAddress, setRevokeAddress] = useState('');
  const [documents, setDocuments] = useState([]);
  const [myShares, setMyShares] = useState([]);
  const [sharedWithMe, setSharedWithMe] = useState([]);

  // 📡 Connexion MetaMask
  const connectWallet = async () => {
    try {
      const provider = initEthers();
      const { account } = await loadContract(provider);
      setAccount(account);
      console.log("✅ Compte connecté :", account);
    } catch (err) {
      console.error("❌ Connexion MetaMask échouée :", err);
    }
  };

  // 📄 Chargement données
  const loadAllData = async () => {
    try {
      const [docs, shares, incoming] = await Promise.all([
        fetchDocuments(),
        getMyShares(),
        getSharedWithMe(),
      ]);
      setDocuments(docs);
      setMyShares(shares);
      setSharedWithMe(incoming);
      console.log("📦 Données chargées :", { docs, shares, incoming });
    } catch (err) {
      console.error("❌ Erreur chargement données :", err);
    }
  };

  useEffect(() => {
    connectWallet().then(loadAllData);
  }, []);

  // 🔒 Révocation d’accès
  const handleRevoke = async () => {
    if (!docId || !revokeAddress) {
      return alert("⚠️ Veuillez remplir tous les champs.");
    }
    try {
      console.log(`🚫 Révocation accès du doc ${docId} pour ${revokeAddress}`);
      await revokeAccess(Number(docId), revokeAddress);
      alert("✅ Accès révoqué !");
      loadAllData(); // Refresh
    } catch (err) {
      alert("❌ Échec révocation !");
      console.error("❌ Erreur revokeAccess :", err);
    }
  };

  return (
    <div className="revoke-container">
      <h2>🔐 Console d'administration – Gérer l'accès</h2>
      <p><strong>Compte connecté :</strong> <code>{account}</code></p>

      <div className="section">
        <label>📁 Sélectionnez un document :</label>
        <select value={docId} onChange={(e) => setDocId(e.target.value)}>
          <option value="">-- Choisir un document --</option>
          {documents.map((doc, idx) => (
            <option key={idx} value={idx}>
              {doc.title || `Document ${idx}`} ({doc.cid.slice(0, 8)}…)
            </option>
          ))}
        </select>

        <label>👤 Adresse à révoquer :</label>
        <input
          type="text"
          placeholder="0x..."
          value={revokeAddress}
          onChange={(e) => setRevokeAddress(e.target.value)}
        />
        <button onClick={handleRevoke}>Révoquer l'accès</button>
      </div>

      <hr />

      <div className="section">
        <h3>📤 Mes partages</h3>
        {myShares.length === 0 ? (
          <p>❌ Aucun document partagé.</p>
        ) : (
          <ul>
            {myShares.map((share, idx) => (
              <li key={idx}>
                <strong>{share.title}</strong> ({share.cid.slice(0, 8)}…)
                <br />
                → partagé avec : <code>{share.sharedWith}</code>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section">
        <h3>📥 Documents partagés avec moi</h3>
        {sharedWithMe.length === 0 ? (
          <p>❌ Aucun partage reçu.</p>
        ) : (
          <ul>
            {sharedWithMe.map((doc, idx) => (
              <li key={idx}>
                <strong>{doc.title}</strong> ({doc.cid.slice(0, 8)}…)
                <br />
                → propriétaire : <code>{doc.owner}</code>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GererAcces;
