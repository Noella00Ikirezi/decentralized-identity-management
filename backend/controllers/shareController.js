// controllers/shareController.js
import qrcode from 'qrcode';
import { contract } from '../utils/ethereum.js';

// Generate QR code for document sharing
export const generateDocumentShareQR = async (req, res, next) => {
  const { documentIndex } = req.body;
  try {
    const shareData = {
      documentIndex,
      targetAddress: req.body.targetAddress,
    };
    const qrData = JSON.stringify(shareData);
    const qr = await qrcode.toDataURL(qrData);
    res.json({ qr });
  } catch (err) {
    next(err);
  }
};

// Accept a shared document
export const acceptSharedDocument = async (req, res, next) => {
  const { fromAddress, documentIndex } = req.body;
  try {
    const tx = await contract.acceptDocumentShare(fromAddress, documentIndex);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    next(err);
  }
};
