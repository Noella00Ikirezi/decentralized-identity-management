// === index.js ===

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ✅ Import correct des routes selon ta structure actuelle
import ipfsRoutes from './routes/ipfs.routes.js';
import documentRoutes from './routes/documents.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔓 Autoriser le frontend React (port Vite)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 📦 Middleware parsing (body JSON + forms)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 📂 Routes backend
app.use('/ipfs', ipfsRoutes);
app.use('/documents', documentRoutes);

// 🚀 Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Backend opérationnel sur http://localhost:${PORT}`);
});
