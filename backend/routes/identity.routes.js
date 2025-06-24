// backend/routes/identity.routes.js
import express from 'express';
import * as identityCtrl from '../controllers/identity.controller.js';

const router = express.Router();

// Gestion des identités
router.get('/owner/:identity', identityCtrl.getOwner);
router.post('/change-owner', identityCtrl.changeOwner);
router.post('/change-owner-signed', identityCtrl.changeOwnerSigned);

// Délégués
router.post('/delegate/add', identityCtrl.addDelegate);
router.post('/delegate/add-signed', identityCtrl.addDelegateSigned);
router.post('/delegate/revoke', identityCtrl.revokeDelegate);
router.post('/delegate/revoke-signed', identityCtrl.revokeDelegateSigned);

// Attributs
router.post('/attribute/set', identityCtrl.setAttribute);
router.post('/attribute/set-signed', identityCtrl.setAttributeSigned);
router.post('/attribute/revoke', identityCtrl.revokeAttribute);
router.post('/attribute/revoke-signed', identityCtrl.revokeAttributeSigned);

// Lien profil
router.post('/profile/link', identityCtrl.linkProfileToIdentity);

// Hash statique
router.post('/hashes', identityCtrl.createHashes);

// Recherche par identité ou propriété
router.get('/identity/:identity', identityCtrl.getIdentity);
router.get('/by-owner/:owner', identityCtrl.getIdentityByOwner);
router.get('/by-delegate/:delegate', identityCtrl.getIdentityByDelegate);
router.get('/by-attribute/:name/:value', identityCtrl.getIdentityByAttribute);
router.get('/by-profile/:cid', identityCtrl.getIdentityByProfile);
router.get('/by-owner-and-profile/:owner/:cid', identityCtrl.getIdentityByOwnerAndProfile);
router.get('/by-owner-and-attribute/:owner/:name/:value', identityCtrl.getIdentityByOwnerAndAttribute);
router.get('/by-delegate-and-profile/:delegate/:cid', identityCtrl.getIdentityByDelegateAndProfile);
router.get('/by-delegate-and-attribute/:delegate/:name/:value', identityCtrl.getIdentityByDelegateAndAttribute);
router.get('/by-profile-and-attribute/:cid/:name/:value', identityCtrl.getIdentityByProfileAndAttribute);
router.get('/by-owner-and-profile-and-attribute/:owner/:cid/:name/:value', identityCtrl.getIdentityByOwnerAndProfileAndAttribute);
router.get('/by-delegate-and-profile-and-attribute/:delegate/:cid/:name/:value', identityCtrl.getIdentityByDelegateAndProfileAndAttribute);
router.get('/by-owner-and-delegate/:owner/:delegate', identityCtrl.getIdentityByOwnerAndDelegate);
router.get('/by-owner-and-delegate-and-profile/:owner/:delegate/:cid', identityCtrl.getIdentityByOwnerAndDelegateAndProfile);
router.get('/by-owner-and-delegate-and-attribute/:owner/:delegate/:name/:value', identityCtrl.getIdentityByOwnerAndDelegateAndAttribute);

export default router;
