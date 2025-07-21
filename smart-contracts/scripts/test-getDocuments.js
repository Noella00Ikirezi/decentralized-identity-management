const { ethers } = require("ethers");
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  // Connexion à Ganache local
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  // Adresse du contrat depuis .env
  const contractAddress = process.env.CONTRACT_ADDRESS;

  // Charger ABI
  const abiPath = path.resolve("backend", "abi", "abi.json");
  const abiJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const abi = abiJson.abi;

  // Instancier le contrat
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Adresse du propriétaire à tester
  const ownerAddress = "0x1C0B88F9ee16856Ca6f1E265A1881F84dd0Cf3a5";

  try {
    const documents = await contract.getDocumentsByOwner(ownerAddress);
    console.log("Documents récupérés :", documents);
  } catch (error) {
    console.error("Erreur lors de l'appel getDocumentsByOwner :", error);
  }
}

test();
