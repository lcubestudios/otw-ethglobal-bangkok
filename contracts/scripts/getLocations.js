require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x4feeF965991ECfe3A184AD51350130133238fca4";
  const LocationLogger = await ethers.getContractFactory("LocationLogger");
  const locationLogger = new ethers.Contract(contractAddress, LocationLogger.interface, hre.ethers.provider);

  console.log("Fetching recorded locations...");
  const locations = await locationLogger.getLocations();

  locations.forEach((location, index) => {
    console.log(`Location ${index + 1}:`);
    console.log(`  User: ${location.user}`);
    console.log(`  Latitude: ${(location.latitude.toString() / 100000).toFixed(6)}`);
    console.log(`  Longitude: ${(location.longitude.toString() / 100000).toFixed(6)}`);
    
    // Convert timestamp from BigInt to a number and format the date
    const timestamp = Number(location.timestamp.toString());
    console.log(`  Timestamp: ${new Date(timestamp * 1000).toLocaleString()}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});