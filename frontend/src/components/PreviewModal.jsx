import React from 'react';

const PreviewModal = ({ cid, name, onClose }) => {
  const url = `https://ipfs.io/ipfs/${cid}`;
  const extension = name.split('.').pop().toLowerCase();

  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension);
  const isPDF = extension === 'pdf';
  const isText = ['txt', 'md', 'json', 'csv'].includes(extension);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Aperçu : {name}</h2>

        <div className="overflow-auto max-h-[70vh]">
          {isImage && (
            <img src={url} alt={name} className="max-w-full max-h-[60vh] mx-auto" />
          )}

          {isPDF && (
            <iframe
              src={url}
              title="PDF preview"
              className="w-full h-[70vh]"
              frameBorder="0"
            ></iframe>
          )}

          {isText && (
            <iframe
              src={url}
              title="Text preview"
              className="w-full h-[60vh] bg-gray-100 border rounded"
            ></iframe>
          )}

          {!isImage && !isPDF && !isText && (
            <p className="text-sm text-gray-600">
              Aperçu non pris en charge pour ce type de fichier.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
