import express from 'express';
import multer from 'multer';
import * as ipfsCtrl from '../controllers/ipfs.controller.js';

const router = express.Router();
const upload = multer();

// === Upload fichier ou JSON vers IPFS + SC ===
router.post('/upload', upload.single('file'), ipfsCtrl.uploadToIPFSAndLink);
router.post('/profile/upload', express.json(), ipfsCtrl.uploadProfileToIPFS);

// === Consultation ===
router.get('/list/:address', ipfsCtrl.getDocuments);
router.get('/content/:cid', ipfsCtrl.getFromIPFS);

// === Révocation document via IPFS ===
router.post('/revoke', ipfsCtrl.revokeDocument);

//=== Profile  ===
router.get('/profile/:identity', ipfsCtrl.getProfileFromIPFS);
router.delete('/profile', express.json(), ipfsCtrl.deleteProfileFromBlockchain);

export default router;
