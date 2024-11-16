async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const TravelNFT = await ethers.getContractFactory("TravelNFT");
  const travelNFT = await TravelNFT.deploy();
  console.log("Contract deployed to:", travelNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
