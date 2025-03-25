import React, { useEffect, useState } from 'react';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem('myDocs') || '[]');
    setDocuments(docs);
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Mes documents</h2>
      {documents.length === 0 ? (
        <p>Aucun document pour l’instant.</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded shadow">
              <p className="font-semibold">{doc.name}</p>
              <a
                href={`https://ipfs.io/ipfs/${doc.cid}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Voir sur IPFS
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDocuments;
