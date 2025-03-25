import React, { useEffect, useState } from 'react';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('myDocs');
    if (stored) {
      setDocuments(JSON.parse(stored));
    }
  }, []);

  const handleCopy = (cid) => {
    navigator.clipboard.writeText(cid);
    alert('CID copié dans le presse-papiers');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Mes documents</h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">Aucun document trouvé.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc, index) => (
            <li key={index} className="border p-3 rounded shadow flex items-center justify-between">
              <div>
                <p className="font-semibold">{doc.name}</p>
                <a
                  href={`https://ipfs.io/ipfs/${doc.cid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  {doc.cid}
                </a>
              </div>
              <button
                onClick={() => handleCopy(doc.cid)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
              >
                Copier CID
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDocuments;
