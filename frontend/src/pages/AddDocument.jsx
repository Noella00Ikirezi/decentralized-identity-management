import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AddDocument.css";

function AddDocument() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCurrentAccount = async () => {
      if (window.ethereum) {
        try {
          // Récupérer les comptes connectés
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setEthereumAddress(accounts[0]);
          } else {
            console.error("Aucun compte connecté trouvé.");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du compte :", error);
        }
      } else {
        console.error("MetaMask n'est pas installé.");
      }
    };

    getCurrentAccount();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !docType || !ethereumAddress) {
      setMessage("❌ Veuillez remplir tous les champs.");
      return;
    }

    try {
      setMessage("📤 Envoi des données...");

      const response = await axios.post('http://localhost:5000/documents/add', {
        cid: "exempleCID",
        mimeType: "exempleMIME",
        title,
        docType,
        ethereumAddress,
        expiresIn: 60 * 60 * 24 * 7
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setMessage("✅ Document ajouté avec succès !");
      console.log("Transaction hash:", response.data.txHash);
    } catch (error) {
      console.error("❌ Erreur addDocument :", error);
      setMessage(`❌ Erreur : ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="add-document-page">
      <Link to="/dashboard" className="back-button">↩️</Link>
      <div className="add-document-card">
        <h2>Ajouter un document</h2>
        <form onSubmit={handleSubmit}>
          <label>Fichier</label>
          <input type="file" onChange={handleFileChange} required />
          <label>Titre</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Type de document</label>
          <input type="text" value={docType} onChange={(e) => setDocType(e.target.value)} required />
          <label>Adresse Ethereum</label>
          <input type="text" value={ethereumAddress} readOnly />
          <button type="submit">Ajouter</button>
        </form>
        {message && <p className={message.includes("✅") ? "success-message" : "error-message"}>{message}</p>}
      </div>
    </div>
  );
}

export default AddDocument;
