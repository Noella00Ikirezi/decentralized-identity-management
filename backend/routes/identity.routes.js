// routes/identity.routes.js
import express from 'express';
import * as controller from '../controllers/identity.controller.js';
import { verifySignature, checkIdentityOwner } from '../middleware/auth.js';

const router = express.Router();

// Routes pour le propriétaire d'une identité
router.get('/owner/:identity', controller.getOwner);
router.post('/owner/change', controller.changeOwner);
router.post('/owner/change-signed', controller.changeOwnerSigned);
router.post('/profile', controller.linkProfileToIdentity);
// Routes pour la gestion des délégués
router.post('/delegate/add', verifySignature, checkIdentityOwner, controller.addDelegate);
router.post('/delegate/add-signed', controller.addDelegateSigned);
router.post('/delegate/revoke', verifySignature, checkIdentityOwner, controller.revokeDelegate);
router.post('/delegate/revoke-signed', controller.revokeDelegateSigned);

// Routes pour la gestion des attributs
router.post('/attribute/set', verifySignature, checkIdentityOwner, controller.setAttribute);
router.post('/attribute/set-signed', controller.setAttributeSigned);
router.post('/attribute/revoke', verifySignature, checkIdentityOwner, controller.revokeAttribute);
router.post('/attribute/revoke-signed', controller.revokeAttributeSigned);

// Route pour créer des hash pour différentes opérations
router.post('/hash', controller.createHashes);

export default router;
