import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ipfsRoutes from './routes/ipfs.routes.js';
import identityRoutes from './routes/identity.routes.js';
import documentsRoutes from './routes/documents.routes.js';

dotenv.config();

const app = express();

// 🔓 Autoriser le frontend à accéder à l’API
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ⬇️ Gérer les requêtes volumineuses
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// 📦 Enregistrement des routes
app.use('/ipfs', ipfsRoutes);
app.use('/identity', identityRoutes);
app.use('/documents', documentsRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
