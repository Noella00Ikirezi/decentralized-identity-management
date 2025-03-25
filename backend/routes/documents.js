import express from 'express';
import {
  storeDocument,
  getMyDocuments,
  shareDocument,
  getDocumentCount,
  uploadFile,
} from '../controllers/documentsController.js';

const router = express.Router();

// Store document
router.post('/store', storeDocument);

// Get all documents
router.get('/my-documents', getMyDocuments);

// Share document with another user
router.post('/share', shareDocument);

// Get document count
router.get('/document-count', getDocumentCount);

// Upload file
// Endpoint for uploading a file
router.post('/upload', uploadFile, storeDocument); // First, multer handles file, then storeDocument stores it on the blockchain


export default router;
