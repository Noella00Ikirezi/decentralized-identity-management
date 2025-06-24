import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const PINATA_BASE_URL = 'https://api.pinata.cloud/pinning';
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET = process.env.PINATA_API_SECRET;

if (!PINATA_API_KEY || !PINATA_SECRET) {
  console.error('❌ Clé API Pinata manquante dans .env');
  process.exit(1);
}

// ⬆️ Upload d’un fichier Buffer ou base64 (ex: image, PDF...)
export const pinFileToIPFS = async (buffer, fileName = 'file.txt') => {
  const formData = new FormData();
  formData.append('file', buffer, fileName);

  const res = await axios.post(`${PINATA_BASE_URL}/pinFileToIPFS`, formData, {
    maxBodyLength: Infinity,
    headers: {
      ...formData.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET
    }
  });

  return res.data;
};

// ⬇️ Accès public via gateway
export const getPinataURL = (cid) => `https://gateway.pinata.cloud/ipfs/${cid}`;
