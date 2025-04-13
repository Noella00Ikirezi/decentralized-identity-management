import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';
import PreviewModal from '../components/PreviewModal';

const Documents = () => {
  const [file, setFile] = useState(null);
  const [cidList, setCidList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cids')) || [];
    setCidList(stored);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/ipfs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const cid = res.data.cid;
      const newList = [...cidList, { cid, name: file.name }];
      setCidList(newList);
      localStorage.setItem('cids', JSON.stringify(newList));
      setSuccess('Fichier uploadé avec succès !');
    } catch (err) {
      console.error(err);
      setError("Échec de l'upload");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Mes documents</h2>

      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 block w-full"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {uploading ? 'Upload en cours...' : 'Uploader vers IPFS'}
        </button>
        {success && <p className="text-green-600 mt-2">{success}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Fichiers enregistrés</h3>
        {cidList.length === 0 ? (
          <p className="text-gray-500">Aucun fichier pour le moment.</p>
        ) : (
          <ul className="space-y-2">
            {cidList.map(({ cid, name }, index) => (
              <DocumentCard key={cid + index} cid={cid} name={name} onPreview={setPreview} />
            ))}
          </ul>
        )}
      </div>

      {preview && (
        <PreviewModal
          cid={preview.cid}
          name={preview.name}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
};

export default Documents;
