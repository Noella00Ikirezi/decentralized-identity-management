// backend/controllers/ipfs.controller.js

import { create } from 'kubo-rpc-client';
import { contract } from '../utils/ethereum.js';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';

// Initialise le client IPFS local
const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

// 📤 Upload d'un fichier ou contenu vers IPFS + enregistrement dans le smart contract
export const uploadToIPFSAndLink = async (req, res) => {
  try {
    const { file } = req;
    const { content } = req.body;

    // 🔍 Étape 1 : convertir en Buffer
    let buffer;
    if (file && file.buffer) {
      buffer = file.buffer;
    } else if (content) {
      buffer = Buffer.from(content);
    } else {
      return res.status(400).json({ error: 'Aucun fichier ni contenu fourni.' });
    }

    // 📎 Étape 2 : détection du type MIME (optionnelle mais utile)
    const fileType = await fileTypeFromBuffer(buffer);
    const mimeType = fileType?.mime || 'application/octet-stream';

    // 📤 Étape 3 : ajout dans IPFS local
    const result = await ipfs.add(buffer);
    const cid = result.cid.toString();

    console.log(`✅ Fichier ajouté à IPFS : ${cid}`);

    // 🔐 Étape 4 : Enregistrement dans le smart contract (optionnel)
    const tx = await contract.connect(contract.signer).addDocument(cid, mimeType);
    await tx.wait();

    // ✅ Étape 5 : Réponse envoyée au client
    res.json({
      success: true,
      cid,
      type: mimeType,
      size: buffer.length,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error('❌ Erreur IPFS local + blockchain :', err);
    res.status(500).json({ error: err.message || 'Erreur interne' });
  }
};

// 📥 Liste des documents d'une adresse
export const getDocuments = async (req, res) => {
  try {
    const { address } = req.params;
    const docs = await contract.connect(contract.signer).getDocumentsByOwner(address);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 Récupération d’un fichier IPFS via CID
export const getFromIPFS = async (req, res) => {
  try {
    const { cid } = req.params;
    const stream = ipfs.cat(cid);
    let content = Buffer.alloc(0);

    for await (const chunk of stream) {
      content = Buffer.concat([content, chunk]);
    }

    const fileType = await fileTypeFromBuffer(content);
    const mimeType = fileType?.mime || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.send(content);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération depuis IPFS :', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔒 Révocation d’un document (mock si non implémenté sur le contrat)
export const revokeDocument = async (req, res) => {
  try {
    const { docId } = req.body;
    const tx = await contract.connect(contract.signer).revokeDocument(parseInt(docId));
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📤 Upload d’un profil utilisateur en JSON
export const uploadProfileToIPFS = async (req, res) => {
  try {
    const { identity, profile } = req.body;
    if (!identity || !profile) {
      return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    const buffer = Buffer.from(JSON.stringify(profile));
    const result = await ipfs.add(buffer);
    const cid = result.cid.toString();

    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const valueBytes = ethers.utils.toUtf8Bytes(cid);

    const tx = await contract.connect(contract.signer).setAttribute(identity, nameHash, valueBytes, 0);
    await tx.wait();

    res.json({ success: true, cid, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

