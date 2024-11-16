// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const TravelBadge = await hre.ethers.getContractFactory("TravelBadge");
  const travelBadge = await TravelBadge.deploy();

  await travelBadge.deployed();
  console.log("TravelBadge deployed to:", travelBadge.address);

  const HotspotRegistry = await hre.ethers.getContractFactory("HotspotRegistry");
  const hotspotRegistry = await HotspotRegistry.deploy();

  await hotspotRegistry.deployed();
  console.log("HotspotRegistry deployed to:", hotspotRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});