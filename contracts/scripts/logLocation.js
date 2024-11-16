require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x123bf069e87ccF152DE6eC53bf86a1e47255aC01";
  const LocationLogger = await ethers.getContractFactory("LocationLogger");
  const locationLogger = LocationLogger.attach(contractAddress);

  // The Temple of the Emerald Buddha
  const latitude = 1375164; // 13.7516435 * 100000
  const longitude = 10049270; // 100.4927041 * 100000
  const placeName = "The Temple of the Emerald Buddha";
  const country = "Thailand";
  const city = "Bangkok";
  const zipCode = "10200";

  // Thong Lo Tower
  // const latitude = 1373514; // 13.7516435 * 100000
  // const longitude = 10058521; // 100.4927041 * 100000
  // const placeName = "Thong Lo Tower";
  // const country = "Thailand";
  // const city = "Bangkok";
  // const zipCode = "10110";

  //Khao San Road
  // const latitude = 1375892; // 13.7516435 * 100000
  // const longitude = 10049726; // 100.4927041 * 100000
  // const placeName = "Khao San Road";
  // const country = "Thailand";
  // const city = "Bangkok";
  // const zipCode = "10200";

  //Chinatown Bangkok
  // const latitude = 1374028; // 13.7516435 * 100000
  // const longitude = 10050977; // 100.4927041 * 100000
  // const placeName = "Chinatown Bangkok";
  // const country = "Thailand";
  // const city = "Bangkok";
  // const zipCode = "10100";

  //Lumphini Park
  // const latitude = 1373143; // 13.7516435 * 100000
  // const longitude = 10054169; // 100.4927041 * 100000
  // const placeName = "Lumphini Park";
  // const country = "Thailand";
  // const city = "Bangkok";
  // const zipCode = "10330";

  console.log("Logging location with additional details...");
  const tx = await locationLogger.logLocation(
    latitude,
    longitude,
    placeName,
    country,
    city,
    zipCode
  );
  await tx.wait();
  console.log("Location successfully logged with additional details!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});