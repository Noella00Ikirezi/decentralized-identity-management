// ipfs.controller.js
import { create } from "kubo-rpc-client";
import multer from "multer";
import fs from "fs";
import path from "path";

const ipfs = create({ url: "http://127.0.0.1:5001" }); // IPFS local

// 📤 Upload d'un fichier
export const uploadToIPFS = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Aucun fichier fourni." });

    const fileBuffer = fs.readFileSync(req.file.path);
    const result = await ipfs.add({ content: fileBuffer, pin: true }); // Ajoute et épingle

    const filename = path.basename(req.file.originalname || req.file.filename);

    // Copie dans le système de fichiers IPFS (MFS) pour visibilité dans Web UI
    await ipfs.files.write(`/files/${filename}`, fileBuffer, {
      create: true,
      parents: true,
    });

    fs.unlinkSync(req.file.path); // Supprime le fichier temporaire
    res.status(200).json({ cid: result.cid.toString() });
  } catch (err) {
    console.error("❌ Erreur uploadToIPFS:", err);
    res.status(500).json({ error: err.message });
  }
};


// 📥 Télécharger un fichier depuis un CID
export const downloadFromIPFS = async (req, res) => {
  try {
    const { cid } = req.params;
    const chunks = [];

    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }

    const fileBuffer = Buffer.concat(chunks);
    res.set("Content-Disposition", `attachment; filename="${cid}"`);
    res.send(fileBuffer);
  } catch (err) {
    console.error("❌ Erreur downloadFromIPFS:", err);
    res.status(500).json({ error: err.message });
  }
};
