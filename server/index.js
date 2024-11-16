const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ethers = require("ethers");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const hotspots = [
  { id: 1, name: "Tokyo Tower", latitude: 35.6586, longitude: 139.7454 },
];

const verifyLocation = (latitude, longitude) => {
  return hotspots.some(
    (spot) =>
      Math.abs(spot.latitude - latitude) < 0.01 &&
      Math.abs(spot.longitude - longitude) < 0.01
  );
};

app.post("/api/nft/mint", async (req, res) => {
  const { latitude, longitude, userId } = req.body;

  if (!verifyLocation(latitude, longitude)) {
    return res.status(400).json({ error: "Invalid location" });
  }

  // Call smart contract to mint NFT here
  res.json({ success: true, message: "NFT Minted!" });
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
