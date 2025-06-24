import express from 'express';
import multer from 'multer';
import {
  uploadToIPFSAndLink,
  getFromIPFS,
  getDocuments,
  revokeDocument
} from '../controllers/ipfs.controller.js';

const router = express.Router();
const upload = multer();

// Routes Web3Storage
router.post('/upload', upload.single('file'), uploadToIPFSAndLink);
router.get('/content/:cid', getFromIPFS);
router.get('/list/:address', getDocuments);
router.post('/revoke', revokeDocument);

export default router;
