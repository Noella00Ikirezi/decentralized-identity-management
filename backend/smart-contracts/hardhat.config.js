require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.29",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: process.env.ETHEREUM_PROVIDER || "http://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
