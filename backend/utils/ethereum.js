// utils/ethereum.js
import { ethers } from 'ethers';
import contractJSON from '../abi.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

// Set up the JSON-RPC provider (e.g., from Infura, Alchemy, Ganache, etc.)
const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_PROVIDER);

// Create a wallet with a private key and connect it to the provider
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create a contract instance with the contract address and ABI
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, wallet);

// Export provider, wallet, and contract so they can be used elsewhere
export { provider, wallet, contract };
