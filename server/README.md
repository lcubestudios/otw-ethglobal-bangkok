# OTW Backend API

[![LCubeStudios](https://badgen.net/badge/Developed%20by/LCube%20Studios?color=FFCB05)](https://lcubestudios.io)

Welcome to the **OTW (On The Way)** backend API! This project is a decentralized travel log application that leverages blockchain technology to create a secure, verifiable timeline of user journeys. Users can check in at any location, and when they visit predefined, curated hotspots, they receive unique NFTs as digital souvenirs. This README provides an overview of the backend API, the routes, and how to set it up.

## **Tech Stack**

- **Backend Framework**: Express.js
- **Blockchain**: Polygon (EVM-compatible)
- **Web3 Library**: Ethers.js
- **Authentication**: Privy
- **Storage**: Logs and NFT metadata are stored on-chain (no traditional database used)
- **Decentralized Storage**: Filecoin (via Web3.Storage)
- **Indexing and Querying**: The Graph (subgraphs for data visualization)

## **Architecture Overview**

The OTW backend API is built using Express.js and integrates directly with the Polygon blockchain for logging travel entries and minting NFTs. The API interacts with smart contracts to store user check-ins and fetch NFT data. User authentication is handled using Privy, and the data is indexed with The Graph for efficient querying.

---

## **Backend API Routes Plan**

### **1. User Profile Routes (`/profile`)**

Manages user profiles, allowing users to update their information and view their ENS-linked profile.

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| GET    | `/profile`      | Fetch current user profile (ENS data). |

### **2. Travel Logs Routes (`/logs`)**

Logs user check-ins directly to the blockchain, creating a secure, immutable record of their travels.

| Method | Endpoint                   | Description                                       |
| ------ | -------------------------- | ------------------------------------------------- |
| POST   | `/logs/create`             | Create a new travel log entry (writes to blockchain). |

### **3. NFT Routes (`/nfts`)**

Handles interactions with NFTs, including minting and fetching user NFT collections.

| Method | Endpoint                | Description                                           |
| ------ | ----------------------- | ----------------------------------------------------- |
| GET    | `/nfts`                 | Fetch all NFTs owned by the user (from blockchain).   |
| GET    | `/nfts/:tokenId`        | Fetch metadata for a specific NFT.                    |
| POST   | `/nfts/mint`            | Mint a new NFT when the user checks in at a hotspot.  |

### **4. Hotspot Routes (`/hotspots`)**

Manages and fetches curated hotspot locations where users can earn NFTs.

| Method | Endpoint             | Description                                       |
| ------ | -------------------- | ------------------------------------------------- |
| GET    | `/hotspots`          | Fetch all predefined curated hotspots.            |
| GET    | `/hotspots/:id`      | Fetch details of a specific hotspot.              |
| POST   | `/hotspots/add`      | Add a new hotspot (admin-only route).             |

### **5. Web3 Interaction Routes (`/web3`)**

Handles direct interactions with the smart contracts, such as verifying user check-ins and fetching contract details.

| Method | Endpoint                  | Description                                           |
| ------ | ------------------------- | ----------------------------------------------------- |
| POST   | `/web3/checkin`           | Verify user location and log check-in on the blockchain. |
| GET    | `/web3/verify/:address`   | Verify if a user owns a specific NFT.                 |
| GET    | `/web3/contract`          | Fetch details of the deployed smart contract (ABI, address). |

---

## **Setup Instructions**

### **1. Prerequisites**

- Node.js (v20 or higher)
- npm or yarn
- Polygon RPC URL (Infura or Alchemy)
- Privy API keys
- Smart contract deployed on Polygon
- Web3.Storage API key

### **2. Installation**

Clone the repository and install dependencies:

```bash
clone https://github.com/lcubestudios/otw-ethglobal-bangkok
cd otw-ethglobal-bangkok
npm install

