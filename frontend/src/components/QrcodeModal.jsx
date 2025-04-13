import React from 'react';
import QRCode from 'react-qr-code'; // ✅ correction

const QRCodeModal = ({ link, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">QR Code</h2>
        <div className="inline-block bg-white p-2 rounded">
          <QRCode value={link} size={200} />
        </div>
        <p className="text-sm mt-4 break-all">{link}</p>
      </div>
    </div>
  );
};

export default QRCodeModal;
