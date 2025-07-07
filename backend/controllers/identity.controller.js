// === identity.controller.js ===

import { contract } from '../utils/ethereum.js';
import { ethers } from 'ethers';
import { create } from 'kubo-rpc-client';
const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

// 🧩 getOwner(identity)
export const getOwner = async (req, res) => {
  try {
    const { identity } = req.params;
    const owner = await contract.getOwner(identity);
    res.json({ identity, owner });
  } catch (err) {
    console.error('❌ Erreur getOwner:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔁 changeOwner(identity, newOwner)
export const changeOwner = async (req, res) => {
  try {
    const { identity, newOwner } = req.body;
    const tx = await contract.changeOwner(identity, newOwner);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur changeOwner:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔐 changeOwnerSigned(identity, newOwner, signature)
export const changeOwnerSigned = async (req, res) => {
  try {
    const { identity, newOwner, v, r, s } = req.body;
    const tx = await contract.changeOwnerSigned(identity, newOwner, v, r, s);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur changeOwnerSigned:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔧 addDelegate(identity, delegateType, delegate, expiresIn)
export const addDelegate = async (req, res) => {
  try {
    const { identity, delegateType, delegate, expiresIn } = req.body;
    const typeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(delegateType));
    const tx = await contract.addDelegate(identity, typeHash, delegate, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur addDelegate:', err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ revokeDelegate(identity, delegateType, delegate)
export const revokeDelegate = async (req, res) => {
  try {
    const { identity, delegateType, delegate } = req.body;
    const typeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(delegateType));
    const tx = await contract.revokeDelegate(identity, typeHash, delegate);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur revokeDelegate:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔐 setAttribute(identity, name, value, expiresIn)
export const setAttribute = async (req, res) => {
  try {
    const { identity, name, value, expiresIn = 0 } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.toUtf8Bytes(value);
    const tx = await contract.setAttribute(identity, nameHash, valueBytes, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur setAttribute:', err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ revokeAttribute(identity, name, value)
export const revokeAttribute = async (req, res) => {
  try {
    const { identity, name, value } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.toUtf8Bytes(value);
    const tx = await contract.revokeAttribute(identity, nameHash, valueBytes);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur revokeAttribute:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔍 getAttributes(identity)
export const getAttributes = async (req, res) => {
  try {
    const { identity } = req.params;
    const attributes = await contract.getAttributes(identity);
    res.json(attributes);
  } catch (err) {
    console.error('❌ Erreur getAttributes:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔍 getAttribute(identity, name)
export const getAttribute = async (req, res) => {
  try {
    const { identity, name } = req.params;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const result = await contract.getAttribute(identity, nameHash);
    res.json({ name, value: ethers.utils.toUtf8String(result) });
  } catch (err) {
    console.error('❌ Erreur getAttribute:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🧠 getChainId()
export const getChainId = async (req, res) => {
  try {
    const chainId = await contract.getChainId();
    res.json({ chainId });
  } catch (err) {
    console.error('❌ Erreur getChainId:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔐 createChangeOwnerHash()
export const createChangeOwnerHash = async (req, res) => {
  try {
    const { identity, newOwner } = req.body;
    const hash = await contract.createChangeOwnerHash(identity, newOwner);
    res.json({ hash });
  } catch (err) {
    console.error('❌ Erreur createChangeOwnerHash:', err);
    res.status(500).json({ error: err.message });
  }
};