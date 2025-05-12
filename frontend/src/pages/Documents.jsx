// Documents.jsx
import React, { useState, useEffect } from 'react';
import './Documents.css';
import { FaUpload, FaShareAlt, FaTrash, FaClock, FaEye } from 'react-icons/fa';
import { ethers } from 'ethers';
import { uploadFileToIPFS } from '../utils/ipfs';
import { setAttribute, revokeAttribute } from '../utils/identityService';
import { GET_DOCUMENTS } from '../api/api';
import axios from 'axios';

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [shareTo, setShareTo] = useState('');
  const [expiresIn, setExpiresIn] = useState(3600);
  const [history, setHistory] = useState({});

  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(GET_DOCUMENTS);
      if (Array.isArray(data)) {
        setDocs(data);
      } else {
        console.warn('La réponse /documents n’est pas un tableau :', data);
        setDocs([]);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des documents :', err);
      setDocs([]);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await uploadFileToIPFS(file);
      setDocs((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async () => {
    try {
      await setAttribute({
        identity: shareTo,
        name: selectedDoc.cid,
        value: selectedDoc.cid,
        expiresIn,
      });
      setHistory((prev) => ({
        ...prev,
        [selectedDoc.cid]: [...(prev[selectedDoc.cid] || []), {
          to: shareTo,
          expiresIn,
          date: new Date().toISOString(),
        }],
      }));
      setSelectedDoc(null);
      alert('Document partagé avec succès.');
    } catch (err) {
      console.error('Erreur de partage :', err);
    }
  };

  const handleRevoke = async (cid) => {
    try {
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await revokeAttribute({
        identity: address,
        name: cid,
        value: cid,
      });
      alert('Partage révoqué.');
    } catch (err) {
      console.error('Erreur de révocation :', err);
    }
  };

  return (
    <div className="documents">
      <label htmlFor="fileInput" className="upload-btn btn">
        <FaUpload /> Upload
      </label>
      <input id="fileInput" type="file" hidden onChange={handleUpload} />

      {docs.map((doc) => (
        <div key={doc.cid} className="doc-card">
          <span>{doc.name || doc.cid}</span>
          <a className="btn" href={`https://ipfs.io/ipfs/${doc.cid}`} target="_blank" rel="noreferrer">
            <FaEye /> Voir
          </a>
          <button className="btn" onClick={() => setSelectedDoc(doc)}>
            <FaShareAlt /> Partager
          </button>
          <button className="btn btn-danger" onClick={() => handleRevoke(doc.cid)}>
            <FaTrash /> Révoquer
          </button>

          {history[doc.cid] && (
            <div className="share-history">
              <h5><FaClock /> Historique</h5>
              <ul>
                {history[doc.cid].map((entry, idx) => (
                  <li key={idx}>
                    {entry.to} - expire dans {entry.expiresIn}s - {new Date(entry.date).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {selectedDoc && (
        <div className="share-modal">
          <h3><FaShareAlt /> Partager le document : {selectedDoc.cid}</h3>
          <input
            type="text"
            placeholder="Adresse Ethereum du destinataire"
            value={shareTo}
            onChange={(e) => setShareTo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Durée en secondes (ex: 3600)"
            value={expiresIn}
            onChange={(e) => setExpiresIn(e.target.value)}
          />
          <button onClick={handleShare} className="btn">
            Confirmer le partage
          </button>
          <button onClick={() => setSelectedDoc(null)} className="btn btn-danger">
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents;
