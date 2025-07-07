// utils/ipfs.js
import axios from 'axios';
import { UPLOAD_IPFS } from '../api/api';

// Upload d'un objet JS (ex: un profil)
export const uploadToIPFS = async (content) => {
  const res = await axios.post(UPLOAD_IPFS, {
    content: JSON.stringify(content),
  }, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

// Upload d'un fichier (ex: .pdf, .png)
export const uploadFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(UPLOAD_IPFS, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
