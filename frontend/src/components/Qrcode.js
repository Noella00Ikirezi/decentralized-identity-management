// src/components/QRCode.js
import React, { useState } from 'react';
import axios from 'axios';

const QRCode = () => {
  const [documentIndex, setDocumentIndex] = useState('');
  const [targetAddress, setTargetAddress] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/share/document/qr', {
        documentIndex,
        targetAddress
      });
      setQrCode(response.data.qr);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Générer QR Code pour partager un document</h2>
      <input
        type="text"
        placeholder="Index du document"
        value={documentIndex}
        onChange={(e) => setDocumentIndex(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adresse du destinataire"
        value={targetAddress}
        onChange={(e) => setTargetAddress(e.target.value)}
      />
      <button onClick={handleGenerateQRCode}>Générer QR Code</button>

      {qrCode && (
        <div>
          <h3>Scan ce QR code pour partager le document :</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRCode;
