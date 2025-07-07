// === index.js ===

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ipfsRoutes from './routes/ipfs.routes.js';
import identityRoutes from './routes/identity.routes.js';
import documentsRoutes from './routes/documents.routes.js';

// 🌍 Initialisation
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 🔓 CORS pour connexion frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// 🧠 Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 📦 Routes centralisées
app.use('/ipfs', ipfsRoutes);
app.use('/identity', identityRoutes);
app.use('/documents', documentsRoutes);

// 🚀 Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ API backend opérationnelle sur http://localhost:${PORT}`);
});