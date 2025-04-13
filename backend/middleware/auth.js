// backend/middleware/auth.js
import { ethers } from 'ethers';
import { contract } from '../utils/ethereum.js';

// Middleware d'authentification via signature Ethereum
export const verifySignature = (req, res, next) => {
  try {
    const { signature, expectedAddress, hash } = req.body;

    if (!hash || !signature || !expectedAddress) {
      return res.status(400).json({ error: 'Paramètres manquants pour la signature' });
    }

    const recovered = ethers.utils.verifyMessage(ethers.utils.arrayify(hash), signature);
    if (recovered.toLowerCase() !== expectedAddress.toLowerCase()) {
      return res.status(403).json({ error: 'Signature invalide' });
    }

    req.signer = recovered;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Erreur de vérification de la signature' });
  }
};

// Middleware pour vérifier si le compte est bien le propriétaire d'une identité
export const checkIdentityOwner = async (req, res, next) => {
  try {
    const { identity } = req.body;
    const signer = req.signer;

    const owner = await contract.getOwner(identity);
    if (owner.toLowerCase() !== signer.toLowerCase()) {
      return res.status(403).json({ error: 'Permission refusée : vous n’êtes pas le propriétaire de cette identité' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la vérification de propriétaire' });
  }
};
