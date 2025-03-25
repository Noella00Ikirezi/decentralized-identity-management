import React, { useState } from 'react';
import { useAccount } from '../contexts/AccountContext';
import { ethers } from 'ethers';

const StoreDocument = () => {
  const { address, contract, ipfs } = useAccount();
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      // 1. Ajouter à IPFS
      const added = await ipfs.add(file);
      const cidStr = added.cid.toString();
      setCid(cidStr);

      // 2. Enregistrer dans smart contract (setAttribute)
      const name = 'did/doc/cid';
      const value = ethers.encodeBytes32String(cidStr);
      const expiresIn = 3600 * 24 * 30; // 30 jours

      const tx = await contract.setAttribute(address, ethers.id(name), value, expiresIn);
      await tx.wait();

      // 3. Stocker localement
      const docs = JSON.parse(localStorage.getItem('myDocs') || '[]');
      localStorage.setItem('myDocs', JSON.stringify([...docs, { cid: cidStr, name: file.name }]));

      alert('Document enregistré !');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'upload.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Uploader un document</h2>
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer sur IPFS'}
      </button>

      {cid && (
        <p className="mt-4 text-green-600">
          ✅ CID : <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">{cid}</a>
        </p>
      )}
    </div>
  );
};

export default StoreDocument;
