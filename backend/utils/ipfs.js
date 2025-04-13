
// File: backend/utils/ipfs.js
import { create } from 'kubo-rpc-client';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.IPFS_HOST || !process.env.IPFS_PORT || !process.env.IPFS_PROTOCOL) {
  console.error("IPFS configuration manquante dans les variables d'environnement");
  process.exit(1);
}

const ipfs = create({
  host: process.env.IPFS_HOST,
  port: process.env.IPFS_PORT,
  protocol: process.env.IPFS_PROTOCOL,
});

const checkConnection = async () => {
  try {
    const id = await ipfs.id();
    console.log("Connecté à IPFS avec l'ID :", id.id);
  } catch (err) {
    console.error("Erreur lors de la connexion à IPFS :", err.message);
    process.exit(1);
  }
};

checkConnection();

export default ipfs;
