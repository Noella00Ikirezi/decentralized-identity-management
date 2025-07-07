// backend/routes/identity.routes.js
import express from 'express';
import * as identityCtrl from '../controllers/identity.controller.js';

const router = express.Router();

// 🔐 Enregistrement ou mise à jour d'un attribut (ex : profil ou document)
router.post('/attribute/set', identityCtrl.setAttribute);

// ❌ Révocation d’un attribut
router.post('/attribute/revoke', identityCtrl.revokeAttribute);

// 🔍 Récupération de tous les attributs d’une identité
router.get('/attributes/:identity', identityCtrl.getAttributes);

// 📎 Lien spécifique du profil JSON (via CID dans IPFS)
router.post('/profile/link', identityCtrl.linkProfileToIdentity);

// 📥 Récupération du profil utilisateur via son CID stocké
router.get('/profile/:address', identityCtrl.getProfile);

// 📤 Upload d’un profil utilisateur en JSON vers IPFS
router.post('/profile/upload', identityCtrl.uploadProfileToIPFS);

// 📥 Récupération du profil utilisateur via son CID stocké
router.get('/profile/cid/:cid', identityCtrl.getProfileByCID);

// 📎 Lien spécifique du profil JSON (via CID dans IPFS)
router.post('/profile/link/cid', identityCtrl.linkProfileToIdentityByCID);

//router.get('/profile/:address', getProfile);
router.get('/profile/:address', identityCtrl.getProfile);

export default router;

