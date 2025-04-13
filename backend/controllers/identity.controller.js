// backend/controllers/identity.controller.js (refacto ethers.js)
import { contract } from '../utils/ethereum.js';
import { ethers } from 'ethers';

const toDelegateTypeHash = (delegateType) => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(delegateType));

export const getOwner = async (req, res) => {
  try {
    const { identity } = req.params;
    const owner = await contract.getOwner(identity);
    res.json({ identity, owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changeOwner = async (req, res) => {
  try {
    const { identity, newOwner } = req.body;
    const tx = await contract.changeOwner(identity, newOwner);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changeOwnerSigned = async (req, res) => {
  try {
    const { identity, newOwner, v, r, s } = req.body;
    const tx = await contract.changeOwnerSigned(identity, newOwner, v, r, s);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDelegate = async (req, res) => {
  try {
    const { identity, delegate, delegateType, expiresIn } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await contract.addDelegate(identity, typeHash, delegate, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDelegateSigned = async (req, res) => {
  try {
    const { identity, delegate, delegateType, expiresIn, v, r, s } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await contract.addDelegateSigned(identity, typeHash, delegate, expiresIn, v, r, s);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeDelegate = async (req, res) => {
  try {
    const { identity, delegate, delegateType } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await contract.revokeDelegate(identity, typeHash, delegate);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeDelegateSigned = async (req, res) => {
  try {
    const { identity, delegate, delegateType, v, r, s } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await contract.revokeDelegateSigned(identity, typeHash, delegate, v, r, s);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setAttribute = async (req, res) => {
  try {
    const { identity, name, value, expiresIn } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.arrayify(value);
    const tx = await contract.setAttribute(identity, nameHash, valueBytes, expiresIn);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setAttributeSigned = async (req, res) => {
  try {
    const { identity, name, value, expiresIn, v, r, s } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.arrayify(value);
    const tx = await contract.setAttributeSigned(identity, nameHash, valueBytes, expiresIn, v, r, s);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeAttribute = async (req, res) => {
  try {
    const { identity, name, value } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.arrayify(value);
    const tx = await contract.revokeAttribute(identity, nameHash, valueBytes);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeAttributeSigned = async (req, res) => {
  try {
    const { identity, name, value, v, r, s } = req.body;
    const nameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const valueBytes = ethers.utils.arrayify(value);
    const tx = await contract.revokeAttributeSigned(identity, nameHash, valueBytes, v, r, s);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHashes = async (req, res) => {
  try {
    const { method, identity, params } = req.body;
    let hash;
    switch (method) {
      case 'changeOwner':
        hash = await contract.callStatic.createChangeOwnerHash(identity, params.newOwner);
        break;
      case 'addDelegate':
        hash = await contract.callStatic.createAddDelegateHash(identity, toDelegateTypeHash(params.delegateType), params.delegate, params.expiresIn);
        break;
      case 'revokeDelegate':
        hash = await contract.callStatic.createRevokeDelegateHash(identity, toDelegateTypeHash(params.delegateType), params.delegate);
        break;
      case 'setAttribute':
        hash = await contract.callStatic.createSetAttributeHash(identity, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(params.name)), ethers.utils.arrayify(params.value), params.expiresIn);
        break;
      case 'revokeAttribute':
        hash = await contract.callStatic.createRevokeAttributeHash(identity, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(params.name)), ethers.utils.arrayify(params.value));
        break;
      default:
        return res.status(400).json({ error: 'Méthode non prise en charge' });
    }
    res.json({ method, hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
