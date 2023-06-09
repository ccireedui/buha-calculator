// scripts/deploy-my-collectible.js
const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const BuhaToken = await ethers.getContractFactory("BuhaToken");

  const buhaToken = await upgrades.deployProxy(BuhaToken);

  await buhaToken.deployed();
  console.log("BuhaToken deployed to:", buhaToken.address);

  const content = {
    BuhaToken: buhaToken.address,
  };
  createAddressJson(
    path.join(__dirname, "/../app/genAddresses.json"),
    JSON.stringify(content)
  );
}

function createAddressJson(path, content) {
  try {
    fs.writeFileSync(path, content);
    console.log("Created Contract Address JSON");
  } catch (err) {
    console.error(err);
    return;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
