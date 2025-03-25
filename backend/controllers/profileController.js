// controllers/profileController.js
import { contract } from '../utils/ethereum.js';

// Create a new profile for the user
export const createProfile = async (req, res, next) => {
  const { email, phoneNumber, ipfsPhoto } = req.body;
  try {
    const tx = await contract.createProfile(email, phoneNumber, ipfsPhoto);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    next(err);
  }
};

// Update user's profile
export const updateProfile = async (req, res, next) => {
  const { email, phoneNumber, ipfsPhoto } = req.body;
  try {
    const tx = await contract.updateProfile(email, phoneNumber, ipfsPhoto);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    next(err);
  }
};

// Get the user's profile
export const getProfile = async (req, res, next) => {
  try {
    const profile = await contract.getMyProfile();
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// Share profile with another user
export const shareProfileWith = async (req, res, next) => {
  const { target } = req.body;
  try {
    const tx = await contract.shareProfileWith(target);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    next(err);
  }
};

// Revoke access to the user's profile
export const revokeProfileAccess = async (req, res, next) => {
  const { target } = req.body;
  try {
    const tx = await contract.revokeProfileAccess(target);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    next(err);
  }
};
