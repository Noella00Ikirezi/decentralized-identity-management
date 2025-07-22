// src/components/AddDocument.jsx
import React, { useState } from 'react';
import '../styles/AddDocument.css';
import { Buffer } from 'buffer';
import { uploadToIPFS } from '../services/ipfsService';
import { initEthers, loadContract } from '../services/ethersService';
import { ethers } from "ethers";

function AddDocument() {
  const [buffer, setBuffer] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const fileBuffer = Buffer.from(reader.result);
      setBuffer(fileBuffer);
      console.log('📦 Buffer prêt :', fileBuffer);
    };
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!window.ethereum) {
    return setMessage("❌ Veuillez installer MetaMask.");
  }

  if (!buffer || !title.trim()) {
    return setMessage("❌ Sélectionnez un fichier et entrez un titre.");
  }

  try {
    // 1. Upload vers IPFS
    const cid = await uploadToIPFS(buffer);
    console.log("✅ CID obtenu :", cid);

    // 2. Interaction avec le contrat
    const provider = initEthers();
    const { contract, signer } = await loadContract(provider);

    const tx = await contract.addDocument(cid, title); // 👈 ici on définit bien tx
    await tx.wait(); // 👈 ici on l'attend proprement

    setMessage("✅ Document ajouté avec succès !");
    setBuffer(null);
    setTitle('');
  } catch (err) {
    console.error("❌ Erreur lors de l'ajout :", err);
    setMessage("❌ Échec lors de l'ajout du document.");
  }
};


  return (
    <div className="add-document-page">
      <div className="add-document-card">
        <h2>Ajouter un document</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">Sélectionner un fichier</label>
          <input type="file" id="file" onChange={captureFile} />

          <label htmlFor="title">Titre du document</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Contrat Alternance"
          />

          <button type="submit">Stocker</button>
        </form>

        {buffer && <p>📎 Fichier prêt à être envoyé</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default AddDocument;
