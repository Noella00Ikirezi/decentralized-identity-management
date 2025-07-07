// backend/routes/ipfs.routes.js

import express from 'express';
import multer from 'multer';

import {
  uploadToIPFSAndLink,
  getFromIPFS,
  getDocuments,
  revokeDocument,
  uploadProfileToIPFS
} from '../controllers/ipfs.controller.js';

const router = express.Router();
const upload = multer();

// 📁 Upload d’un fichier vers IPFS local + enregistrement smart contract
router.post('/upload', upload.single('file'), uploadToIPFSAndLink);

// 📂 Récupération d’un fichier depuis IPFS par CID
router.get('/content/:cid', getFromIPFS);

// 📜 Récupération des documents liés à une adresse
router.get('/list/:address', getDocuments);

// ❌ Révocation d’un document (si pris en charge par le smart contract)
router.post('/revoke', express.json(), revokeDocument);

// 👤 Upload d’un profil utilisateur (JSON → IPFS → smart contract)
router.post('/profile/upload', express.json(), uploadProfileToIPFS);

export default router;
