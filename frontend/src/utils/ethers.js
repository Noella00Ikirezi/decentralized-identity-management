// utils/ethers.js
import { ethers } from "ethers";
import abiJson from "../abi/abi.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const getContractWithSigner = async () => {
  if (!window.ethereum) {
    throw new Error("❌ MetaMask non détecté");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  if (!CONTRACT_ADDRESS) {
    throw new Error("❌ Adresse du contrat non définie dans .env");
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, abiJson.abi, signer);
  console.log("🔗 Contrat instancié à :", CONTRACT_ADDRESS);
  
  if (contract?.interface?.functions) {
    console.log("📜 Fonctions disponibles :", Object.keys(contract.interface.functions));
  } else {
    console.warn("⚠️ Impossible d'afficher les fonctions : contract.interface.functions est indéfini");
  }

  return contract;
};
