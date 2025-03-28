import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const Qrcode = () => {
  const [cid, setCid] = useState('');

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">QR Code pour un CID</h2>

      <input
        type="text"
        placeholder="Entre un CID IPFS"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      {cid && (
        <div className="text-center">
          <QRCode value={`https://ipfs.io/ipfs/${cid}`} size={256} />
          <p className="mt-2 text-sm text-gray-600">https://ipfs.io/ipfs/{cid}</p>
        </div>
      )}
    </div>
  );
};

export default Qrcode;