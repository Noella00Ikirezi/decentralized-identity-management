// routes/ipfs.routes.js
import express from 'express';
import * as controller from '../controllers/ipfs.controller.js';  // Importation des fonctions du contrôleur IPFS

const router = express.Router();

// Route pour télécharger un fichier ou du texte vers IPFS
router.post('/upload', controller.uploadToIPFS);

// Route pour récupérer un fichier ou du texte depuis IPFS via CID
router.get('/content/:cid', controller.getFromIPFS);

export default router;
