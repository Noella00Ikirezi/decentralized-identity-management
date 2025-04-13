// routes/ipfs.routes.js
import express from 'express';
import * as controller from '../controllers/ipfs.controller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// Route pour uploader un fichier ou texte vers IPFS
router.post('/upload', upload.single('file'), controller.uploadToIPFS);

// Route pour récupérer un contenu IPFS par CID
router.get('/content/:cid', controller.getFromIPFS);

export default router;