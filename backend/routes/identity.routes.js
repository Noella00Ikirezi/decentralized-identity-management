import express from 'express';
import * as identityCtrl from '../controllers/identity.controller.js';

const router = express.Router();

// === Propriétaire / Délégation ===
router.get('/owner/:identity', identityCtrl.getOwner);
router.post('/owner/change', identityCtrl.changeOwner);
router.post('/owner/change-signed', identityCtrl.changeOwnerSigned);
router.post('/delegate/add', identityCtrl.addDelegate);
router.post('/delegate/revoke', identityCtrl.revokeDelegate);

// === Attributs ===
router.post('/attribute/set', identityCtrl.setAttribute);
router.post('/attribute/revoke', identityCtrl.revokeAttribute);
router.get('/attributes/:identity', identityCtrl.getAttributes);
router.get('/attribute/:identity/:name', identityCtrl.getAttribute);

// === Hash & Metadata ===
router.get('/chain-id', identityCtrl.getChainId);
router.post('/hash/owner-change', identityCtrl.createChangeOwnerHash);

export default router;
