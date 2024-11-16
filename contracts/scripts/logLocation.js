require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x4feeF965991ECfe3A184AD51350130133238fca4";
  const LocationLogger = await ethers.getContractFactory("LocationLogger");
  const locationLogger = LocationLogger.attach(contractAddress);

  // Updated geolocation for Thong Lo Tower
  // const latitude = 1373514; // 13.7351453 * 100000
  // const longitude = 10058521; // 100.5852058 * 100000
  // console.log("Logging location at Thong Lo Tower...");

  // Updated geolocation for The Temple of the Emerald Buddha
  // const latitude = 1375164; // 13.7351453 * 100000
  // const longitude = 10049270; // 100.5852058 * 100000
  // console.log("Logging location at The Temple of the Emerald Buddha...");

  // Updated geolocation for Khao San Road
  // const latitude = 1375892; // 13.7351453 * 100000
  // const longitude = 10049726; // 100.5852058 * 100000
  // console.log("Logging location at Khao San Road...");

  // Updated geolocation for Chinatown Bangkok
  // const latitude = 1374028; // 13.7351453 * 100000
  // const longitude = 10050977; // 100.5852058 * 100000
  // console.log("Logging location at Chinatown Bangkok...");

  // // Updated geolocation for Lumphini Park
  // const latitude = 1373143; // 13.7351453 * 100000
  // const longitude = 10054169; // 100.5852058 * 100000
  // console.log("Logging location at Lumphini Park...");

  // Updated geolocation for Suvarnabhumi Airport
  const latitude = 1368189; // 13.7351453 * 100000
  const longitude = 10074687; // 100.5852058 * 100000
  console.log("Logging location at Suvarnabhumi Airport...");

  const tx = await locationLogger.logLocation(latitude, longitude);
  await tx.wait();
  console.log("Location successfully logged!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});