import express from 'express';
import multer from 'multer';
import { uploadToIPFS, getFromIPFS } from '../controllers/ipfs.controller.js';

const router = express.Router();
const upload = multer(); // memoryStorage par défaut

router.post('/upload', upload.single('file'), uploadToIPFS);
router.get('/get/:cid', getFromIPFS);

export default router;
