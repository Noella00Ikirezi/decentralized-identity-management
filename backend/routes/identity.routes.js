// routes/identity.routes.js
import express from 'express';
import * as controller from '../controllers/identity.controller.js'; // Importation des fonctions du contrôleur

const router = express.Router();

// Routes pour le propriétaire d'une identité
router.get('/owner/:identity', controller.getOwner);  // Récupérer le propriétaire d'une identité
router.post('/owner/change', controller.changeOwner);  // Changer le propriétaire d'une identité
router.post('/owner/change-signed', controller.changeOwnerSigned);  // Changer le propriétaire avec signature

// Routes pour la gestion des délégués
router.post('/delegate/add', controller.addDelegate);  // Ajouter un délégué
router.post('/delegate/add-signed', controller.addDelegateSigned);  // Ajouter un délégué avec signature
router.post('/delegate/revoke', controller.revokeDelegate);  // Révoquer un délégué
router.post('/delegate/revoke-signed', controller.revokeDelegateSigned);  // Révoquer un délégué avec signature

// Routes pour la gestion des attributs
router.post('/attribute/set', controller.setAttribute);  // Définir un attribut
router.post('/attribute/set-signed', controller.setAttributeSigned);  // Définir un attribut avec signature
router.post('/attribute/revoke', controller.revokeAttribute);  // Révoquer un attribut
router.post('/attribute/revoke-signed', controller.revokeAttributeSigned);  // Révoquer un attribut avec signature

// Route pour créer des hash pour différentes opérations
router.post('/hash', controller.createHashes);  // Créer des hashes pour différentes opérations

export default router;
