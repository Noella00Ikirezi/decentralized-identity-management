// src/components/MyDocuments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents');  // Correct endpoint
        setDocuments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>My Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            <p>Type: {doc.docType}</p>
            <p>IPFS Hash: {doc.ipfsHash}</p>
            <p>Date: {new Date(doc.timestamp * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyDocuments;
