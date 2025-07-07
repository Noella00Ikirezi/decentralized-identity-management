// === documents.controller.js ===

import { contract } from '../utils/ethereum.js';
import { ethers } from 'ethers';

// 📄 Ajout d’un document IPFS
export const addDocument = async (req, res) => {
  try {
    const { cid, mimeType, expiresIn = 0 } = req.body;
    const tx = await contract.addDocument(cid, mimeType, expiresIn);
    await tx.wait();
    console.log(`📤 Document ajouté : ${cid}`);
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur addDocument:', err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Révocation d’un document IPFS
export const revokeDocument = async (req, res) => {
  try {
    const { docId } = req.body;
    const tx = await contract.revokeDocument(parseInt(docId));
    await tx.wait();
    console.log(`🗑️ Document révoqué : ${docId}`);
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur revokeDocument:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🤝 Partage d’un document IPFS avec expiration
export const shareDocument = async (req, res) => {
  try {
    const { docId, recipient, duration } = req.body;
    const tx = await contract.shareDocument(parseInt(docId), recipient, duration);
    await tx.wait();
    console.log(`🔗 Document ${docId} partagé avec ${recipient}`);
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur shareDocument:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🚫 Révocation d’un partage de document
export const revokeSharedAccess = async (req, res) => {
  try {
    const { docId, recipient } = req.body;
    const tx = await contract.revokeSharedAccess(parseInt(docId), recipient);
    await tx.wait();
    console.log(`🔒 Partage du document ${docId} révoqué pour ${recipient}`);
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur revokeSharedAccess:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Vérifier si msg.sender peut accéder à un document
export const canAccess = async (req, res) => {
  try {
    const { owner, docId } = req.params;
    const access = await contract.canAccess(owner, parseInt(docId));
    res.json({ access });
  } catch (err) {
    console.error('❌ Erreur canAccess:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 Récupérer les documents de l’utilisateur connecté
export const getMyDocuments = async (req, res) => {
  try {
    const docs = await contract.getMyDocuments();
    res.json(docs);
  } catch (err) {
    console.error('❌ Erreur getMyDocuments:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📜 Récupérer les accès partagés d’un document
export const getSharedAccesses = async (req, res) => {
  try {
    const { docId } = req.params;
    const accesses = await contract.getSharedAccesses(parseInt(docId));
    res.json(accesses);
  } catch (err) {
    console.error('❌ Erreur getSharedAccesses:', err);
    res.status(500).json({ error: err.message });
  }
};
