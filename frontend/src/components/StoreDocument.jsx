import React, { useState } from 'react';
import axios from 'axios';

const StoreDocument = () => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('');
  const [success, setSuccess] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !docType) return;
    setError('');
    setSuccess(false);

    try {
      // Create FormData and append the file and document type
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', docType);

      // Send the file to the backend for IPFS upload
      const response = await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update state with the IPFS hash and tx hash from the backend response
      setIpfsHash(response.data.ipfsHash);
      setTxHash(response.data.txHash);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Échec de l\'enregistrement du document.');
    }
  };

  return (
    <div>
      <h2>Enregistrer un document (PDF, PNG...)</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Type de document (ex: Passeport)"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>

      {success && (
        <div style={{ marginTop: '1rem', color: 'green' }}>
          ✅ Document enregistré avec succès !<br />
          <strong>IPFS Hash :</strong> {ipfsHash}<br />
          <strong>Tx Hash :</strong> {txHash}<br />
          <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noreferrer">
            Voir le fichier sur IPFS
          </a>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
};

export default StoreDocument;
