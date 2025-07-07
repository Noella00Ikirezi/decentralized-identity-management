import { JsonRpcProvider, Wallet, Contract } from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Chargement de l'ABI depuis abi.json
const contractJson = JSON.parse(fs.readFileSync('./abi.json'));
const abi = contractJson.abi;

const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

export { contract, wallet, provider };
export const getContract = () => {
  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error('❌ CONTRACT_ADDRESS manquant dans .env');
  }
  return contract;
};
export const getWallet = () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error('❌ PRIVATE_KEY manquant dans .env');
  }
  return wallet;
};  


export const getProvider = () => {
  if (!process.env.RPC_URL) {
    throw new Error('❌ RPC_URL manquant dans .env');
  }       
  return provider;
};

export const getNetwork = async () => {
  const network = await provider.getNetwork();
  return network;
};  

export const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const getBalance = async (address) => {
  if (!address) {
    throw new Error('❌ Adresse manquante pour obtenir le solde');
  }
  const balance = await provider.getBalance(address);
  return balance;
};

export const getTransaction = async (txHash) => {
  if (!txHash) {
    throw new Error('❌ Hash de transaction manquant');
  }
  const tx = await provider.getTransaction(txHash);
  return tx;
};

export const getTransactionReceipt = async (txHash) => {
  if (!txHash) {
    throw new Error('❌ Hash de transaction manquant pour obtenir le reçu');
  }
  const receipt = await provider.getTransactionReceipt(txHash);
  return receipt;
};

export const getGasPrice = async () => {
  const gasPrice = await provider.getGasPrice();
  return gasPrice;
};

export const estimateGas = async (tx) => {
  if (!tx) {
    throw new Error('❌ Transaction manquante pour estimer le gaz');
  }
  const gasEstimate = await provider.estimateGas(tx);
  return gasEstimate;
};  


export const waitForTransaction = async (txHash, confirmations = 1) => {
  if (!txHash) {
    throw new Error('❌ Hash de transaction manquant pour attendre la confirmation');
  }
  const receipt = await provider.waitForTransaction(txHash, confirmations);
  return receipt;
};

export const getBlock = async (blockNumberOrHash) => {
  if (!blockNumberOrHash) {
    throw new Error('❌ Numéro ou hash de bloc manquant');
  }
  const block = await provider.getBlock(blockNumberOrHash);
  return block;
};

export const getBlockWithTransactions = async (blockNumberOrHash) => {
  if (!blockNumberOrHash) {
    throw new Error('❌ Numéro ou hash de bloc manquant pour obtenir les transactions');
  }
  const block = await provider.getBlockWithTransactions(blockNumberOrHash);
  return block;
};

export const getCode = async (address) => {
  if (!address) {
    throw new Error('❌ Adresse manquante pour obtenir le code');
  }
  const code = await provider.getCode(address);
  return code;
};

export const getStorageAt = async (address, position) => {
  if (!address || position === undefined) {
    throw new Error('❌ Adresse ou position de stockage manquante');
  }
  const storage = await provider.getStorageAt(address, position);
  return storage;
};