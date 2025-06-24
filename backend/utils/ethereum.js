import { ethers } from 'ethers';
import contractJSON from '../abi.json' assert { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RPC_URL || !process.env.PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
  throw new Error('❌ .env incomplet (RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS requis)');
}

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, wallet);

export { provider, wallet, contract };
