import express from "express";
import {
  uploadToIPFS,
  getFromIPFS,
  uploadMiddleware,
} from "../controllers/ipfs.controller.js";

const router = express.Router();

// 🆙 Upload fichier vers IPFS
router.post("/upload", uploadMiddleware, uploadToIPFS);

// 🔎 Lire un fichier depuis IPFS (proxy)
router.get("/:cid", getFromIPFS);

export default router;
