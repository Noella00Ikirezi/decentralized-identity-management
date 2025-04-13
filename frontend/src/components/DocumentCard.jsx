import React from 'react';

const DocumentCard = ({ name, cid, onPreview }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600 break-all">CID: {cid}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onPreview({ name, cid })}
          className="text-indigo-500 hover:underline text-sm"
        >
          Aperçu
        </button>
        <a
          href={`https://ipfs.io/ipfs/${cid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline text-sm"
        >
          Voir
        </a>
      </div>
    </div>
  );
};

export default DocumentCard;
