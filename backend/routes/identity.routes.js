// routes/identity.routes.js
import express from 'express';
import * as controller from '../controllers/identity.controller.js';

const router = express.Router();

router.get('/owner/:identity', controller.getOwner);
router.post('/owner/change', controller.changeOwner);
router.post('/owner/change-signed', controller.changeOwnerSigned);

router.post('/delegate/add', controller.addDelegate);
router.post('/delegate/add-signed', controller.addDelegateSigned);
router.post('/delegate/revoke', controller.revokeDelegate);
router.post('/delegate/revoke-signed', controller.revokeDelegateSigned);

router.post('/attribute/set', controller.setAttribute);
router.post('/attribute/set-signed', controller.setAttributeSigned);
router.post('/attribute/revoke', controller.revokeAttribute);
router.post('/attribute/revoke-signed', controller.revokeAttributeSigned);

router.post('/hash', controller.createHashes);

export default router; // ✅ C’est ça qu’il manquait
