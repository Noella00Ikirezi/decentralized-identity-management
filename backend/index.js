// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import identityRoutes from './routes/identity.routes.js';
import ipfsRoutes from './routes/ipfs.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/ipfs', ipfsRoutes);
app.use('/api/identity', identityRoutes); 

// Démarrage serveur
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Backend started on http://localhost:${process.env.PORT || 5000}`);
});
