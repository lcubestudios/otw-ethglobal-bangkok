# OTW Backend Smart Contracts

[![LCubeStudios](https://badgen.net/badge/Developed%20by/LCube%20Studios?color=FFCB05)](https://lcubestudios.io)


Welcome to the **OTW (On The Way)** smart contracts folder. This folder contains the Solidity contracts that power the OTW decentralized travel log application. The smart contracts are designed to log user check-ins, mint NFTs as digital souvenirs, and manage curated hotspots. This README provides an overview of the smart contract architecture, deployment instructions, and details on how the contracts interact with the backend API.

### **Folder Breakdown**

- **contracts/**: Contains all Solidity smart contracts.
- **scripts/**: Deployment and verification scripts.
- **test/**: Unit tests for smart contracts.
- **artifacts/** and **cache/**: Generated files by Hardhat during compilation.

---

## **Tech Stack**

- **Smart Contract Language**: Solidity (v0.8.19)
- **Development Framework**: Hardhat
- **Blockchain**: Polygon (EVM-compatible)
- **Libraries**: OpenZeppelin (for ERC-721 and access control)
- **Storage**: Filecoin (via Web3.Storage for NFT metadata)

---

## **Smart Contracts Overview**

### **1. AnimeTravelBadge.sol**

This is the main NFT contract, implementing the **ERC-721** standard for minting unique NFTs as digital souvenirs when users check in at predefined hotspots.

#### **Key Features:**
- **ERC-721 Implementation**: Uses OpenZeppelin’s ERC-721 for NFT standard compliance.
- **Minting Function**: Allows minting of NFTs when a user checks in at a curated hotspot.
- **Custom Metadata**: Dynamically generates metadata for each NFT, including location and timestamp.

#### **Key Functions:**

| Function               | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `mintBadge(address to, uint256 hotspotId)` | Mints an NFT for the specified user at a verified hotspot. |
| `setBaseURI(string memory baseURI)`        | Sets the base URI for NFT metadata (admin-only).           |
| `tokenURI(uint256 tokenId)`                | Returns the metadata URI for a given token ID.             |

---

### **2. HotspotRegistry.sol**

The **HotspotRegistry** contract manages the list of predefined, curated hotspots where users can mint NFTs. This contract is used to verify that a user’s check-in location matches one of the registered hotspots.

#### **Key Features:**
- **Hotspot Management**: Allows admin to add or remove hotspots.
- **Location Verification**: Verifies if a user’s check-in matches a registered hotspot.

#### **Key Functions:**

| Function                      | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| `addHotspot(uint256 id, string memory name, int256 latitude, int256 longitude)` | Adds a new hotspot (admin-only). |
| `removeHotspot(uint256 id)`   | Removes a hotspot by its ID (admin-only).        |
| `verifyHotspot(uint256 id, int256 userLat, int256 userLong)` | Verifies if the user’s location matches the hotspot. |

---

## **Environment Setup**

### **1. Prerequisites**

- Node.js (v20 or higher)
- Hardhat (installed globally or locally)
- Polygon RPC URL (Infura or Alchemy)
- Private key of a deployer wallet
- OpenZeppelin Contracts (installed via npm)

### **2. Installation**

Clone the repository and navigate to the `contracts/` folder:

```bash
git clone https://github.com/lcubestudios/otw-ethglobal-bangkok
cd otw-ethglobal-bangkok
npm install