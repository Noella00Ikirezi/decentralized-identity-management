import { ethers } from "ethers";
import contractData from "../assets/contractData.json"; // Assure-toi que ce fichier existe bien

const { address, abi } = contractData;

export function getEthereumContract() {
  if (!window.ethereum) {
    throw new Error("🦊 MetaMask n'est pas disponible.");
  }

  const provider = new ethers.BrowserProvider(window.ethereum); // ethers 6.x
  return provider.getSigner().then((signer) => {
    return new ethers.Contract(address, abi, signer);
  });
}
