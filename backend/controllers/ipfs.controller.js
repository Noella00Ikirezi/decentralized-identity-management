import fs from "fs";
import path from "path";
import { create } from "kubo-rpc-client";
import multer from "multer";

const ipfs = create({ url: "http://localhost:5001" }); // IPFS local

// 📂 Configuration multer pour fichier unique
const upload = multer({ dest: "uploads/" });
export const uploadMiddleware = upload.single("file");

// 🆙 Upload fichier sur IPFS
// ✅ Route de chargement IPFS avec détection MIME
export async function uploadToIPFS(req, res) {
  try {
    if (!req.file) {
      console.warn("⚠️ [uploadToIPFS] Aucun fichier reçu");
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    console.log(`📁 [uploadToIPFS] Fichier reçu : ${req.file.originalname}`);

    const { cid } = await ipfs.add({
      path: req.file.originalname,
      content: req.file.buffer,
    });

    const mimeType = req.file.mimetype;
    console.log(`✅ [uploadToIPFS] CID : ${cid.toString()}`);
    console.log(`✅ [uploadToIPFS] MIME : ${mimeType}`);

    res.json({
      cid: cid.toString(),
      mimeType,
    });
  } catch (err) {
    console.error("❌ [uploadToIPFS] Erreur :", err);
    res.status(500).json({ error: "Erreur lors de l'upload IPFS" });
  }
}


// 🔎 Lire un fichier depuis IPFS
export async function getFromIPFS(req, res) {
  try {
    const { cid } = req.params;
    const stream = ipfs.cat(cid);

    let data = "";
    for await (const chunk of stream) {
      data += chunk.toString();
    }

    res.send(data);
  } catch (error) {
    console.error("❌ getFromIPFS:", error);
    res.status(500).json({ error: "Erreur lors de la lecture IPFS" });
  }
}
