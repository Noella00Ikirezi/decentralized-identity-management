import multer from 'multer';
import axios from 'axios';
import { contract } from '../utils/ethereum.js';

// Set up multer to handle file uploads (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file upload (middleware to handle file)
export const uploadFile = upload.single('file'); // "file" is the key name in the form

// Store Document Handler
export const storeDocument = async (req, res, next) => {
  try {
    const { file } = req;  // Access file from multer middleware

    // If no file is uploaded, return an error
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create FormData for sending the file to IPFS (ensure file is a Blob)
    const formData = new FormData();
    formData.append('file', file.buffer, req.file.originalname); // ensure file is a Blob type

    // Send the file to your local IPFS node or IPFS service
    const ipfsResponse = await axios.post('http://localhost:5001/api/v0/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // IPFS hash returned from IPFS
    const ipfsHash = ipfsResponse.data.Hash;

    // Store the document hash and type in your blockchain (smart contract)
    const docType = req.body.docType; // The document type passed in the request body
    const tx = await contract.storeDocumentHash(ipfsHash, docType);
    await tx.wait();

    // Respond with the IPFS hash and transaction hash
    res.json({
      success: true,
      ipfsHash: ipfsHash,
      txHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const getMyDocuments = async (req, res, next) => {
  try {
    const documents = await contract.getMyDocuments();
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

export const shareDocument = async (req, res, next) => {
  try {
    const { docIndex, recipient, permissions } = req.body;
    const tx = await contract.shareDocumentWith(recipient, docIndex);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    next(error);
  }
};

export const revokeDocumentAccess = async (req, res, next) => {
  const { index, target } = req.params;
  try {
    const tx = await contract.revokeDocumentAccess(target, index);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    next(err);
  }
};

export const getDocumentCount = async (req, res, next) => {
  try {
    const count = await contract.getMyDocumentCount();
    res.json({ count: count.toString() });
  } catch (error) {
    next(error);
  }
};

export const storeDocumentOnChain = async (req, res, next) => {
  try {
    const { ipfsHash, docType } = req.body;
    const tx = await contract.storeDocumentHash(ipfsHash, docType);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    next(error);
  }
};
