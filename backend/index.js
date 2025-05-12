import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ipfsRoutes from './routes/ipfs.routes.js';
import identityRoutes from './routes/identity.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// CORS pour autoriser le frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ⬇️ Augmenter la limite de payload
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Routes
app.use('/ipfs', ipfsRoutes);
app.use('/identity', identityRoutes);

// Gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
