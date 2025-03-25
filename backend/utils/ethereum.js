// utils/ethereum.js
import { ethers } from 'ethers';
import contractJSON from '../abi.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

// ✅ Vérifie que toutes les variables d'environnement sont bien présentes
if (!process.env.ETHEREUM_PROVIDER) {
  throw new Error('ETHEREUM_PROVIDER not set in .env');
}
if (!process.env.PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY not set in .env');
}
if (!process.env.CONTRACT_ADDRESS) {
  throw new Error('CONTRACT_ADDRESS not set in .env');
}

// ✅ Initialisation du provider (Ganache, Infura, Alchemy, etc.)
const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_PROVIDER);

// ✅ Création du wallet connecté au provider
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ✅ Création de l’instance du smart contract
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractJSON.abi,
  wallet
);

// ✅ Export des objets pour utilisation dans le backend
export { provider, wallet, contract };
