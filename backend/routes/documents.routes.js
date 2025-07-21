import express from "express";
import {
  getMyDocuments,
  addDocument,
  revokeDocument,
  shareDocument,
  revokeSharedAccess,
  getSharedAccesses,
  canAccessDocument,
} from "../controllers/documents.controller.js";

const router = express.Router();

// 📄 Récupérer les documents de l'utilisateur
router.get("/get", getMyDocuments);

// ➕ Ajouter un document
router.post("/add", addDocument);

// ❌ Révoquer un document
router.post("/revoke/:docId", revokeDocument);

// 🔗 Partager un document
router.post("/share", shareDocument);

// 👥 Révoquer un partage
router.post("/revoke-share", revokeSharedAccess);

// 👁 Obtenir l'historique des accès
router.get("/shared/:docId", getSharedAccesses);

// 🔍 Vérifier si l'utilisateur peut accéder à un document
router.get("/can-access/:owner/:docId", canAccessDocument);

export default router;
