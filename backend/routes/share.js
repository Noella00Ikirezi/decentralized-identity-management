import express from 'express';
import { generateDocumentShareQR, acceptSharedDocument } from '../controllers/shareController.js';

const router = express.Router();

// Generate QR for sharing document
router.post('/document/qr', generateDocumentShareQR);

// Accept shared document
router.post('/document/accept', acceptSharedDocument);

export default router;
