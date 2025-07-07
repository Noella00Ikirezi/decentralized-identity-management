// backend/routes/documents.routes.js

import express from 'express';
import multer from 'multer';
import {
  uploadDocument,
  getDocument,
  revokeDocument,
  getDocumentMetadata,
  getDocumentsByAddress
} from '../controllers/documents.controller.js';

const router = express.Router();
const upload = multer();

// 📁 Upload d’un fichier vers IPFS + enregistrement dans le smart contract
router.post('/upload', upload.single('file'), uploadDocument);

// 📂 Récupération du contenu du fichier IPFS
router.get('/content/:cid', getDocument);

// ❌ Révocation du document sur la blockchain
router.post('/revoke', express.json(), revokeDocument);

// 🧾 Récupération des métadonnées du document
router.get('/metadata/:cid', getDocumentMetadata);

// 📜 Liste des documents liés à une adresse Ethereum
router.get('/by-address/:address', getDocumentsByAddress);

export default router;
