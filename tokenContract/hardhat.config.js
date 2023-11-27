require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.ALCHEMY_API_KEY, // Replace with your RPC endpoint
      accounts: [process.env.PRIVATE_KEY], // Replace with your private key for deploying
    },
  },
  solidity: "0.8.18",
};
