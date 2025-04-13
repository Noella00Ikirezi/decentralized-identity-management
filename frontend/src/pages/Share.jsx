import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // ✅ nouveau package compatible

const Share = () => {
  const [selectedCid, setSelectedCid] = useState('');
  const [cids, setCids] = useState([]);
  const [shareType, setShareType] = useState('document');
  const [link, setLink] = useState('');

  useEffect(() => {
    const storedCids = JSON.parse(localStorage.getItem('cids')) || [];
    setCids(storedCids);
  }, []);

  const handleGenerateLink = () => {
    let generatedLink = '';
    if (shareType === 'profile') {
      generatedLink = `${window.location.origin}/profile-view`;
    } else if (selectedCid) {
      generatedLink = `https://ipfs.io/ipfs/${selectedCid}`;
    }

    setLink(generatedLink);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Partager</h2>

      <div className="bg-white p-6 shadow rounded space-y-4">
        <div>
          <label className="block font-medium mb-2">Type de partage</label>
          <select
            value={shareType}
            onChange={(e) => {
              setShareType(e.target.value);
              setLink('');
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="document">Document</option>
            <option value="profile">Profil</option>
          </select>
        </div>

        {shareType === 'document' && (
          <div>
            <label className="block font-medium mb-2">Sélectionner un fichier</label>
            <select
              value={selectedCid}
              onChange={(e) => {
                setSelectedCid(e.target.value);
                setLink('');
              }}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Choisir un document --</option>
              {cids.map(({ cid, name }) => (
                <option key={cid} value={cid}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleGenerateLink}
          disabled={shareType === 'document' && !selectedCid}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Générer le lien / QR code
        </button>

        {link && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-700">Lien de partage :</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
              {link}
            </a>
            <div className="mt-4 inline-block bg-white p-2 rounded">
              <QRCode value={link} size={150} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Share;
