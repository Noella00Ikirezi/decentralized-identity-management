import express from "express";
import multer from "multer";
import { uploadToIPFS, downloadFromIPFS } from "../controllers/ipfs.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 📤 Upload vers IPFS
router.post("/upload", upload.single("file"), uploadToIPFS);

// 📥 Téléchargement depuis IPFS
router.get("/download/:cid", downloadFromIPFS);

export default router;
