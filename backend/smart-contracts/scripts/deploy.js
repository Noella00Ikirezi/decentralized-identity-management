const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const IdentityManager = await hre.ethers.getContractFactory("IdentityManager");
  const contract = await IdentityManager.deploy();
  await contract.waitForDeployment(); // ✅ ethers v6 compatible

  console.log(`Contract deployed at: ${contract.target}`); // target remplace address

  // 📝 Mise à jour automatique du .env
  const envPath = ".env";
  let env = fs.readFileSync(envPath, "utf8");

  if (env.includes("CONTRACT_ADDRESS=")) {
    env = env.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${contract.target}`);
  } else {
    env += `\nCONTRACT_ADDRESS=${contract.target}`;
  }

  fs.writeFileSync(envPath, env);
  console.log("✅ CONTRACT_ADDRESS mis à jour dans .env");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
