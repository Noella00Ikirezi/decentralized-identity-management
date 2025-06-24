require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { RPC_URL, PRIVATE_KEY } = process.env;

if (!RPC_URL || !PRIVATE_KEY) {
  throw new Error("❌ RPC_URL ou PRIVATE_KEY manquant dans .env");
}

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
