const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("📦 Étape 1 : Chargement de la factory...");
  const IdentityManagerFull = await hre.ethers.getContractFactory("IdentityManagerFull");

  console.log("🚀 Étape 2 : Déploiement du contrat...");
  const contract = await IdentityManagerFull.deploy();

  console.log("⏳ Étape 3 : Attente de confirmation...");
  await contract.waitForDeployment(); // ✅ pour ethers v6

  console.log("✅ Contrat déployé à :", contract.target); // ✅ pour ethers v6

  const data = {
    address: contract.target,
    abi: contract.interface.format("json"),
  };

  fs.mkdirSync("deployed", { recursive: true });
  fs.writeFileSync("deployed/contractData.json", JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
