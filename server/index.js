require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Network selection (default to Arbitrum)
const network = process.env.NETWORK || 'arbitrum';
let providerUrl;
let contractAddress;

if (network === 'arbitrum') {
  providerUrl = process.env.ARB_SEPOLIA_TESTNET;
  contractAddress = process.env.ARBITRUM_CONTRACT_ADDRESS;
} else if (network === 'polygon') {
  providerUrl = process.env.POLY_ZKEVM_TESTNET;
  contractAddress = process.env.POLYGON_CONTRACT_ADDRESS;
} else {
  throw new Error('Unsupported network specified');
}

const provider = new ethers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Replace with your contract's ABI
const contractAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "latitude",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "longitude",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "placeName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "country",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "zipCode",
        "type": "string"
      }
    ],
    "name": "LocationRecorded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getLocations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "int256",
            "name": "latitude",
            "type": "int256"
          },
          {
            "internalType": "int256",
            "name": "longitude",
            "type": "int256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "placeName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "country",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "zipCode",
            "type": "string"
          }
        ],
        "internalType": "struct LocationLogger.Location[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "locations",
    "outputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "latitude",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "longitude",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "placeName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "country",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "zipCode",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "latitude",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "longitude",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "placeName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "country",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "zipCode",
        "type": "string"
      }
    ],
    "name": "logLocation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

// Endpoint to get nearby places
app.get('/nearby-places', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    // Use Google Places API to find nearby places
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1800&key=${process.env.GOOGLE_API_KEY}`;

    const response = await axios.get(placesUrl);
    const data = response.data;

    if (data.status !== 'OK') {
      return res.status(400).json({ error: 'Unable to get nearby places.' });
    }

    // Send the list of places to the front end
    res.json({
      places: data.results,
    });
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Endpoint to log location based on selected place metadata
app.post('/log-location', async (req, res) => {
  try {
    const { placeId, userAddress } = req.body;

    if (!placeId) {
      return res.status(400).json({ error: 'placeId is required.' });
    }

    // Retrieve place details using Place Details API
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`;

    const response = await axios.get(placeDetailsUrl);
    const data = response.data;

    if (data.status !== 'OK') {
      return res.status(400).json({ error: 'Unable to get place details.' });
    }

    const result = data.result;

    // Extract necessary metadata
    const latitude = result.geometry.location.lat;
    const longitude = result.geometry.location.lng;
    const placeName = result.name || 'Unknown Place';
    const addressComponents = result.address_components || [];
    let country = '';
    let city = '';
    let zipCode = '';

    addressComponents.forEach((component) => {
      if (component.types.includes('country')) {
        country = component.long_name;
      } else if (
        component.types.includes('administrative_area_level_1') ||
        component.types.includes('locality')
      ) {
        city = component.long_name;
      } else if (component.types.includes('postal_code')) {
        zipCode = component.long_name;
      }
    });

    // Prepare data for smart contract interaction
    const scaledLatitude = Math.round(latitude * 100000);
    const scaledLongitude = Math.round(longitude * 100000);

    console.log('Logging location to blockchain...');

    // Interact with the smart contract
    const tx = await contract.logLocation(
      scaledLatitude,
      scaledLongitude,
      placeName,
      country,
      city,
      zipCode,
      { gasLimit: 500000 }
    );
    await tx.wait();

    console.log('Location successfully logged on blockchain!');

    res.json({
      message: 'Location logged successfully.',
      transactionHash: tx.hash,
      data: {
        latitude,
        longitude,
        placeName,
        country,
        city,
        zipCode,
      },
    });
  } catch (error) {
    console.error('Error logging location:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});