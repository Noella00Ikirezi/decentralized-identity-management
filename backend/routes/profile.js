import express from 'express';
import {
  createProfile,
  updateProfile,
  getProfile,
  shareProfileWith,
  revokeProfileAccess,
} from '../controllers/profileController.js';

const router = express.Router();

// Create a profile
router.post('/create', createProfile);

// Update profile
router.post('/update', updateProfile);

// Get profile
router.get('/', getProfile);

// Share profile with another user
router.post('/share', shareProfileWith);

// Revoke profile access
router.post('/revoke', revokeProfileAccess);

export default router;
