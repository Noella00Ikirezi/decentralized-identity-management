const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Répertoires et chemins configurables
const backendDir = path.resolve(__dirname, "../../backend");
const abiSrc = path.resolve(__dirname, "../build/contracts/IdentityManager.json");
const abiDestDir = path.join(backendDir, "abi");
const abiDest = path.join(abiDestDir, "abi.json");
const envPath = path.join(backendDir, ".env");

try {
  console.log("📦 Compilation des contrats...");
  execSync("truffle compile", { stdio: "inherit" });
  console.log("✅ Contrats compilés avec succès !");

  console.log("📦 Exécution des migrations...");
  const migrateOutput = execSync("truffle migrate --reset", { encoding: "utf8" });
  console.log(migrateOutput);
  console.log("✅ Migrations exécutées avec succès !");

  // Extraire l'adresse du contrat déployé
  const contractAddressMatch = migrateOutput.match(/contract address:\s+(0x[a-fA-F0-9]{40})/i);
  if (!contractAddressMatch) {
    throw new Error("Impossible de trouver l'adresse du contrat dans la sortie de migration.");
  }
  const contractAddress = contractAddressMatch[1];
  console.log(`✅ Adresse du contrat déployé : ${contractAddress}`);

  // Vérifier présence fichier .env
  if (!fs.existsSync(envPath)) {
    throw new Error(`Fichier .env non trouvé à : ${envPath}`);
  }

  // Lire et modifier .env pour CONTRACT_ADDRESS
  let envContent = fs.readFileSync(envPath, "utf8");
  if (envContent.match(/^CONTRACT_ADDRESS=.*$/m)) {
    envContent = envContent.replace(/^CONTRACT_ADDRESS=.*$/m, `CONTRACT_ADDRESS=${contractAddress}`);
  } else {
    envContent += `\nCONTRACT_ADDRESS=${contractAddress}\n`;
  }
  fs.writeFileSync(envPath, envContent, "utf8");
  console.log("✅ Fichier .env mis à jour avec la nouvelle adresse du contrat.");

  // Copier l'ABI dans backend/abi
  if (!fs.existsSync(abiDestDir)) {
    fs.mkdirSync(abiDestDir, { recursive: true });
  }
  const fullJson = JSON.parse(fs.readFileSync(abiSrc, "utf8"));
  fs.writeFileSync(abiDest, JSON.stringify({ abi: fullJson.abi }, null, 2));
  console.log("✅ ABI synchronisée avec succès !");

  // Installer les dépendances (optionnel)
  console.log("📦 Installation des dépendances...");
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Dépendances installées avec succès !");

  // Exécuter les tests (optionnel)
  console.log("📦 Exécution des tests...");
  execSync("truffle test", { stdio: "inherit" });
  console.log("✅ Tests exécutés avec succès !");

  // Nettoyer anciens ABI (optionnel)
  const oldAbiPath = path.join(abiDestDir, "old_abi.json");
  if (fs.existsSync(oldAbiPath)) {
    fs.unlinkSync(oldAbiPath);
    console.log("✅ Anciens fichiers ABI nettoyés !");
  }

  console.log("🚀 Script de synchronisation terminé !");
} catch (error) {
  console.error(`❌ Erreur détectée : ${error.message}`);
  process.exit(1);
}
