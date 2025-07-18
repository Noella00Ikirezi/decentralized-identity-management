import express from "express";
import {
  addDocument,
  getMyDocuments,
  revokeDocument,
  shareDocument,
  revokeShare,
  canAccess,
  getSharedAccesses
} from "../controllers/documents.controller.js";

const router = express.Router();

// ➕ Ajouter un document
router.post("/", addDocument);

// 📥 Récupérer tous les documents de l'utilisateur connecté
router.get("/my", getMyDocuments);

// ❌ Révoquer un document
router.post("/revoke", revokeDocument);

// 🔄 Partager un document
router.post("/share", shareDocument);

// ❌ Révoquer un accès partagé
router.post("/revoke-share", revokeShare);

// 🔍 Vérifier un accès : /documents/access/:owner/:docId
router.get("/access/:owner/:docId", canAccess);

// 📜 Obtenir les accès partagés : /documents/shared/:docId
router.get("/shared/:docId", getSharedAccesses);

export default router;
