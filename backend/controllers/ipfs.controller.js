// === ipfs.controller.js ===

import { create } from 'kubo-rpc-client';
import { contract } from '../utils/ethereum.js';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';

const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

// 📤 Upload d'un fichier ou contenu vers IPFS + enregistrement dans le smart contract
export const uploadToIPFSAndLink = async (req, res) => {
  try {
    const { file } = req;
    const { content, expiresIn = 0 } = req.body;

    let buffer;
    if (file && file.buffer) {
      buffer = file.buffer;
    } else if (content) {
      buffer = Buffer.from(content);
    } else {
      return res.status(400).json({ error: 'Aucun fichier ni contenu fourni.' });
    }

    const fileType = await fileTypeFromBuffer(buffer);
    const mimeType = fileType?.mime || 'application/octet-stream';

    const result = await ipfs.add(buffer);
    const cid = result.cid.toString();
    console.log(`📁 Fichier ajouté à IPFS : ${cid}`);

    const tx = await contract.addDocument(cid, mimeType, expiresIn);
    await tx.wait();

    res.json({
      success: true,
      cid,
      type: mimeType,
      size: buffer.length,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error('❌ Erreur IPFS local + blockchain :', err);
    res.status(500).json({ error: err.message });
  }
};

// 📤 Upload d’un profil utilisateur en JSON (setAttribute avec key "profile")
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

    const tx = await contract.setAttribute(identity, nameHash, valueBytes, 0);
    await tx.wait();

    res.json({ success: true, cid, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur uploadProfileToIPFS:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 Lire le profil JSON IPFS à partir de l’attribut 'profile'
export const getProfileFromIPFS = async (req, res) => {
  try {
    const { identity } = req.params;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const attribute = await contract.getAttribute(identity, nameHash);
    const cid = ethers.utils.toUtf8String(attribute);

    const stream = ipfs.cat(cid);
    let content = Buffer.alloc(0);
    for await (const chunk of stream) {
      content = Buffer.concat([content, chunk]);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(content.toString());
  } catch (err) {
    console.error('❌ Erreur getProfileFromIPFS:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🧽 Révocation du profil utilisateur (attribut profile)
export const deleteProfileFromBlockchain = async (req, res) => {
  try {
    const { identity } = req.body;
    if (!identity) {
      return res.status(400).json({ error: 'Identity manquant.' });
    }

    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const attribute = await contract.getAttribute(identity, nameHash);
    const value = attribute;
    const tx = await contract.revokeAttribute(identity, nameHash, value);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur deleteProfileFromBlockchain:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📜 Liste des documents d'une adresse
export const getDocuments = async (req, res) => {
  try {
    const { address } = req.params;
    const docs = await contract.getDocumentsByOwner(address);
    res.json(docs);
  } catch (err) {
    console.error('❌ Erreur getDocuments:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📂 Récupération d’un fichier IPFS via CID
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
    console.error('❌ Erreur récupération IPFS :', err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Révocation d’un document IPFS
export const revokeDocument = async (req, res) => {
  try {
    const { docId } = req.body;
    const tx = await contract.revokeDocument(parseInt(docId));
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur revokeDocument:', err);
    res.status(500).json({ error: err.message });
  }
};