import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

if (!RPC_URL) {
  throw new Error("❌ RPC_URL manquante dans .env");
}
if (!PRIVATE_KEY || !ethers.isHexString(PRIVATE_KEY)) {
  throw new Error("❌ PRIVATE_KEY invalide ou manquante dans .env");
}
if (!CONTRACT_ADDRESS) {
  throw new Error("❌ CONTRACT_ADDRESS manquante dans .env");
}

const abiPath = path.join(process.cwd(), "abi", "abi.json");
if (!fs.existsSync(abiPath)) {
  throw new Error("❌ ABI introuvable à : " + abiPath);
}

const raw = JSON.parse(fs.readFileSync(abiPath, "utf8"));
if (!raw.abi) {
  throw new Error("❌ ABI invalide dans le fichier ABI");
}
const abi = raw.abi;

export const provider = new ethers.JsonRpcProvider(RPC_URL);
export const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
export const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

console.log("🔧 Configuration Ethereum :");
console.log("• RPC_URL =", RPC_URL);
console.log("• CONTRACT_ADDRESS =", CONTRACT_ADDRESS);
console.log("• Wallet address =", wallet.address);

// Diagnostic de contrat
(async () => {
  try {
    const code = await provider.getCode(CONTRACT_ADDRESS);
    console.log(`🔍 Code bytecode (${CONTRACT_ADDRESS}):`, code === "0x" ? "❌ AUCUN" : "✅ Présent");
  } catch (error) {
    console.error("Erreur lors de la récupération du bytecode du contrat :", error);
  }
})();

// Affiche les signatures disponibles dans l'ABI
console.log("📦 Fonctions disponibles dans l'ABI :");
abi
  .filter((f) => f.type === "function")
  .forEach((f) => console.log(` - ${f.name}(${f.inputs.map((i) => `${i.type} ${i.name}`).join(", ")})`));
