const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ZenithToken = await ethers.getContractFactory("ZenithToken");
  const zenithToken = await ZenithToken.deploy(
    "Zenith Token", // Replace with your desired token name
    "ZNTH", // Replace with your desired token symbol
    18, // Replace with the desired number of decimals
    ethers.utils.parseEther("1000000") // Replace with the desired initial supply in ethers
  );

  console.log("ZenithToken address:", zenithToken.address);

  console.log("Deployment completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
