import express from 'express';
import * as docCtrl from '../controllers/documents.controller.js';

const router = express.Router();

// === Documents ===
router.post('/add', docCtrl.addDocument);
router.post('/revoke', docCtrl.revokeDocument);

// === Partage ===
router.post('/share', docCtrl.shareDocument);
router.post('/revoke-share', docCtrl.revokeSharedAccess);

// === Accès & Consultation ===
router.get('/access/:owner/:docId', docCtrl.canAccess);
router.get('/my', docCtrl.getMyDocuments);
router.get('/shared/:docId', docCtrl.getSharedAccesses);

export default router;
