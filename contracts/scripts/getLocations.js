require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x123bf069e87ccF152DE6eC53bf86a1e47255aC01";
  const LocationLogger = await ethers.getContractFactory("LocationLogger");
  const locationLogger = LocationLogger.attach(contractAddress);

  console.log("Fetching recorded locations...");
  const locations = await locationLogger.getLocations();

  locations.forEach((location, index) => {
    console.log(`Location ${index + 1}:`);
    console.log(`  User: ${location.user}`);
    console.log(`  Latitude: ${(location.latitude.toString() / 100000).toFixed(6)}`);
    console.log(`  Longitude: ${(location.longitude.toString() / 100000).toFixed(6)}`);
    console.log(`  Timestamp: ${new Date(Number(location.timestamp.toString()) * 1000).toLocaleString()}`);
    console.log(`  Place Name: ${location.placeName}`);
    console.log(`  Country: ${location.country}`);
    console.log(`  City: ${location.city}`);
    console.log(`  Zip Code: ${location.zipCode}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});