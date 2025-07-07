// backend/controllers/identity.controller.js (simplifié pour profil JSON + documents IPFS)

import { contract } from '../utils/ethereum.js';
import { ethers } from 'ethers';
import { create } from 'kubo-rpc-client';
const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

// 🔐 Ajout ou mise à jour d'un attribut (CID ou autre)
export const setAttribute = async (req, res) => {
  try {
    const { identity, name, value, expiresIn = 0 } = req.body;
    if (!identity || !name || !value) {
      return res.status(400).json({ error: 'Champs requis manquants.' });
    }
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.toUtf8Bytes(value);
    const tx = await contract.connect(contract.signer).setAttribute(identity, nameHash, valueBytes, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Révocation d'un attribut
export const revokeAttribute = async (req, res) => {
  try {
    const { identity, name, value } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.toUtf8Bytes(value);
    const tx = await contract.connect(contract.signer).revokeAttribute(identity, nameHash, valueBytes);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Récupérer les attributs d'une identité (ex : profil)
export const getAttributes = async (req, res) => {
  try {
    const { identity } = req.params;
    const attributes = await contract.getAttributes(identity);
    res.json(attributes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📎 Lier un profil JSON (CID) à l'identité
export const linkProfileToIdentity = async (req, res) => {
  try {
    const { identity, cid, expiresIn = 0 } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const valueBytes = ethers.utils.toUtf8Bytes(cid);
    const tx = await contract.connect(contract.signer).setAttribute(identity, nameHash, valueBytes, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { address } = req.params;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const valueBytes = await contract.getAttribute(address, nameHash);
    const cid = ethers.utils.toUtf8String(valueBytes);

    const response = await fetch(`http://localhost:8080/ipfs/${cid}`);
    if (!response.ok) throw new Error('Fichier IPFS introuvable');

    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(404).json({ error: 'Profil non trouvé' });
  }
};

// 📤 Upload d’un profil utilisateur en JSON vers IPFS
export const uploadProfileToIPFS = async (req, res) => {
  try {
    const { identity, profile } = req.body;
    if (!identity || !profile) {
      return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    const owner = await contract.getOwner(identity);
    console.log(`👤 Vérification du propriétaire : ${owner}`);
    if (owner.toLowerCase() !== contract.signer.address.toLowerCase()) {
      return res.status(403).json({ error: `Le backend n'est pas autorisé à modifier cette identité.` });
    }

    const buffer = Buffer.from(JSON.stringify(profile));
    const result = await ipfs.add(buffer);
    const cid = result.cid.toString();

    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const valueBytes = ethers.utils.toUtf8Bytes(cid);
    const tx = await contract.connect(contract.signer).setAttribute(identity, nameHash, valueBytes);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash, cid });
  } catch (err) {
    console.error('❌ Erreur uploadProfileToIPFS:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 Récupération d’un profil utilisateur via son CID stocké 
export const getProfileByCID = async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await fetch(`http://localhost:8080/ipfs/${cid}`);
    if (!response.ok) throw new Error('Fichier IPFS introuvable');

    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(404).json({ error: 'Profil non trouvé' });
  }
};

// 📎 Lien spécifique du profil JSON (via CID dans IPFS)
export const linkProfileToIdentityByCID = async (req, res) => {
  try {
    const { identity, cid, expiresIn = 0 } = req.body;
    if (!identity || !cid) {
      return res.status(400).json({ error: 'Champs requis manquants.' });
    }
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('profile'));
    const valueBytes = ethers.utils.toUtf8Bytes(cid);
    const tx = await contract.connect(contract.signer).setAttribute(identity, nameHash, valueBytes, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
