const hre = require("hardhat");

async function main() {
  const LocationLogger = await hre.ethers.getContractFactory("LocationLogger");
  const locationLogger = await LocationLogger.deploy();

  await locationLogger.waitForDeployment();
  console.log("LocationLogger deployed to:", await locationLogger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});