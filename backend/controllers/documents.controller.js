// documents.controller.js
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// ✅ Chargement ABI
const abi = JSON.parse(fs.readFileSync("./abi.json")).abi;

// ✅ Configuration du provider + wallet
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

// ➕ Ajouter un document
export const addDocument = async (req, res) => {
  try {
    const { cid, mimeType, title, docType } = req.body;

    if (!cid || !mimeType || !title || !docType) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const tx = await contract.addDocument(cid, mimeType, title, docType);
    await tx.wait();

    res.status(201).json({ message: "✅ Document ajouté avec succès." });
  } catch (err) {
    console.error("❌ Erreur addDocument:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 Obtenir les documents de l'utilisateur connecté
export const getMyDocuments = async (req, res) => {
  try {
    const docs = await contract.getMyDocuments();
    res.json(docs);
  } catch (err) {
    console.error("❌ Erreur getMyDocuments:", err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Révoquer un document
export const revokeDocument = async (req, res) => {
  try {
    const { docId } = req.body;
    const tx = await contract.revokeDocument(docId);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("❌ Erreur revokeDocument:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Partager un document
export const shareDocument = async (req, res) => {
  try {
    const { docId, recipient, duration } = req.body;
    const tx = await contract.shareDocument(docId, recipient, duration);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("❌ Erreur shareDocument:", err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Révoquer un accès partagé
export const revokeShare = async (req, res) => {
  try {
    const { docId, recipient } = req.body;
    const tx = await contract.revokeSharedAccess(docId, recipient);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("❌ Erreur revokeShare:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Vérifier un accès
export const canAccess = async (req, res) => {
  try {
    const { owner, docId } = req.params;
    const access = await contract.canAccess(owner, docId);
    res.json({ access });
  } catch (err) {
    console.error("❌ Erreur canAccess:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📜 Obtenir les accès partagés
export const getSharedAccesses = async (req, res) => {
  try {
    const { docId } = req.params;
    const accesses = await contract.getSharedAccesses(docId);
    res.json(accesses);
  } catch (err) {
    console.error("❌ Erreur getSharedAccesses:", err);
    res.status(500).json({ error: err.message });
  }
};
