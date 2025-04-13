// index.js
import express from 'express';
import dotenv from 'dotenv';
import ipfsRoutes from './routes/ipfs.routes.js';  // Importation des routes IPFS
import identityRoutes from './routes/identity.routes.js';  // Importation des routes Identity

// Charger les variables d'environnement
dotenv.config();

// Initialisation du serveur Express
const app = express();

// Middleware pour traiter le JSON
app.use(express.json());

// Middleware pour traiter les fichiers (si nécessaire)
import multer from 'multer';
const upload = multer();

// Utilisation des routes
app.use('/ipfs', ipfsRoutes);  // Routes IPFS sous /ipfs
app.use('/identity', identityRoutes);  // Routes Identity sous /identity

// Démarrage serveur
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Backend started on http://localhost:${process.env.PORT || 5000}`);
});