// backend/index.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const { create } = require('ipfs-http-client');

// Initialiser l'app Express
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connexion à Ethereum via ethers.js
const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_PROVIDER);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Exemple de chargement du contrat (ABI à générer depuis Truffle)
const contractABI = require('./abi.json'); // à générer via Truffle compile
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Connexion IPFS
const ipfs = create({
  host: process.env.IPFS_HOST,
  port: process.env.IPFS_PORT,
  protocol: process.env.IPFS_PROTOCOL,
});

// Route de base pour tester la connexion
app.get('/', (req, res) => {
  res.json({ message: '✅ API Decentralized Identity Management opérationnelle !' });
});

// Exemple de route : Stocker un document sur IPFS et sauvegarder son hash sur Ethereum
app.post('/api/documents', async (req, res) => {
  try {
    const { documentData } = req.body;

    // Ajouter à IPFS
    const { path } = await ipfs.add(JSON.stringify(documentData));

    // Sauvegarder le hash IPFS sur Ethereum via Smart Contract (exemple)
    const tx = await contract.storeDocumentHash(path);
    await tx.wait();

    res.status(201).json({ ipfsHash: path, txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Backend démarré sur http://localhost:${port}`);
});
