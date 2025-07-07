// File: backend/utils/ipfs.js

import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';

dotenv.config();

const IPFS_API_URL = process.env.IPFS_API_URL || 'http://127.0.0.1:5001/api/v0';

if (!IPFS_API_URL) {
  console.error('❌ URL API IPFS manquante dans .env');
  process.exit(1);
}

// ✅ Upload d’un fichier Buffer (depuis formulaire)
export const pinFileToIPFS = async (buffer, fileName = 'file.txt') => {
  const formData = new FormData();
  formData.append('file', buffer, fileName);

  const res = await axios.post(`${IPFS_API_URL}/add`, formData, {
    maxBodyLength: Infinity,
    headers: formData.getHeaders(),
  });

  return {
    IpfsHash: res.data.Hash, // compatibilité avec ancien code Pinata
    Size: res.data.Size,
    Name: fileName,
  };
};

// ✅ Upload depuis le disque local
export const pinFileFromFS = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ Fichier non trouvé : ${filePath}`);
  }
  const fileStream = fs.createReadStream(filePath);
  const formData = new FormData();
  formData.append('file', fileStream);

  const res = await axios.post(`${IPFS_API_URL}/add`, formData, {
    maxBodyLength: Infinity,
    headers: formData.getHeaders(),
  });

  return {
    IpfsHash: res.data.Hash,
    Size: res.data.Size,
    Name: filePath.split('/').pop(),
  };
};

// ✅ Upload JSON directement
export const pinJSONToIPFS = async (json) => {
  const buffer = Buffer.from(JSON.stringify(json));
  return await pinFileToIPFS(buffer, 'data.json');
};


