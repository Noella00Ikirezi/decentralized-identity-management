const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 📁 Chemins
const rootDir = path.resolve(__dirname, "../../");
const backendDir = path.join(rootDir, "backend");
const frontendDir = path.join(rootDir, "frontend");
const abiSrc = path.join(__dirname, "../build/contracts/IdentityManager.json");
const backendAbiDest = path.join(backendDir, "abi", "abi.json");
const frontendAbiDest = path.join(frontendDir, "src", "abi", "abi.json");
const backendEnv = path.join(backendDir, ".env");
const frontendEnv = path.join(frontendDir, ".env");

try {
  console.log("📦 Compilation des contrats...");
  execSync("truffle compile", { stdio: "inherit" });

  console.log("🚀 Migration (déploiement)...");
  const migrateOutput = execSync("truffle migrate --reset", { encoding: "utf8" });
  console.log(migrateOutput);

  // 🔎 Extraction adresse du contrat déployé
  const addressMatch = migrateOutput.match(/contract address:\s+(0x[a-fA-F0-9]{40})/i);
  if (!addressMatch) throw new Error("❌ Impossible de trouver l'adresse du contrat.");
  const contractAddress = addressMatch[1];
  console.log(`✅ Contrat déployé à : ${contractAddress}`);

  // 🔄 Lecture ABI
  const fullJson = JSON.parse(fs.readFileSync(abiSrc, "utf8"));
  const abi = { abi: fullJson.abi };

  // 📁 Écriture ABI dans backend/abi
  fs.mkdirSync(path.dirname(backendAbiDest), { recursive: true });
  fs.writeFileSync(backendAbiDest, JSON.stringify(abi, null, 2));
  console.log("✅ ABI copiée dans backend/abi");

  // 📁 Écriture ABI dans frontend/src/abi
  fs.mkdirSync(path.dirname(frontendAbiDest), { recursive: true });
  fs.writeFileSync(frontendAbiDest, JSON.stringify(abi, null, 2));
  console.log("✅ ABI copiée dans frontend/src/abi");

  // 📝 Mise à jour backend/.env
  let backendEnvContent = fs.existsSync(backendEnv) ? fs.readFileSync(backendEnv, "utf8") : "";
  if (/^CONTRACT_ADDRESS=.*$/m.test(backendEnvContent)) {
    backendEnvContent = backendEnvContent.replace(/^CONTRACT_ADDRESS=.*/m, `CONTRACT_ADDRESS=${contractAddress}`);
  } else {
    backendEnvContent += `\nCONTRACT_ADDRESS=${contractAddress}\n`;
  }
  fs.writeFileSync(backendEnv, backendEnvContent);
  console.log("✅ backend/.env mis à jour");

  // 📝 Mise à jour frontend/.env
  let frontendEnvContent = fs.existsSync(frontendEnv) ? fs.readFileSync(frontendEnv, "utf8") : "";
  if (/^VITE_CONTRACT_ADDRESS=.*$/m.test(frontendEnvContent)) {
    frontendEnvContent = frontendEnvContent.replace(/^VITE_CONTRACT_ADDRESS=.*/m, `VITE_CONTRACT_ADDRESS=${contractAddress}`);
  } else {
    frontendEnvContent += `\nVITE_CONTRACT_ADDRESS=${contractAddress}\n`;
  }
  fs.writeFileSync(frontendEnv, frontendEnvContent);
  console.log("✅ frontend/.env mis à jour");

  console.log("🎉 Synchronisation terminée !");
} catch (err) {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
}
