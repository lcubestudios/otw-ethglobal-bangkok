# On The Way

## Overview

"On The Way" is a travel logging and badge collection app powered by blockchain. Users can check into locations, log their journeys, and earn unique badges.

---

## Prerequisites

- **Node.js** >= 16.x
- **Yarn** or **npm**
- **MetaMask wallet**
- Access to **The Graph** and **Google API keys**
- A deployed **smart contract** (Polygon, Arbitrum, or Scroll)

---

## Project Structure

- **client/**: Frontend built with Next.js
- **server/**: Backend server for interacting with the blockchain and external APIs
- **graphs/**: The Graph subgraph configuration for querying blockchain data

---

## Frontend (client)

### Environment Variables

Create a `.env` file in the `client` directory with the following values:

```
NEXT_PUBLIC_PAGE_TITLE='On The Way'
NEXT_PUBLIC_PRIVY_APP_ID='<your-privy-app-id>'
PRIVY_APP_SECRET='<your-privy-app-secret>'
NEXT_PUBLIC_LOG_QUERY_URL='<subgraph-query-url>'
NEXT_PUBLIC_API_URL='<server-url>' # e.g., 'http://localhost:3001' for local dev
```

### Setup

1. Navigate to the `client` directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Visit the app at [http://localhost:3000](http://localhost:3000).

---

## Backend (server)

### Environment Variables

Create a `.env` file in the `server` directory with the following values:

```
PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
GOOGLE_API_KEY=YOUR_GOOGLE_GEOCODING_API_KEY
CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
POLY_ZKEVM_TESTNET=https://polygonzkevm-cardona.g.alchemy.com/v2/<api-key>
SCROLL_SEPOLIA_TESTNET=https://scroll-sepolia.g.alchemy.com/v2/<api-key>
ARB_SEPOLIA_TESTNET=https://arb-sepolia.g.alchemy.com/v2/<api-key>
```

### Setup

1. Navigate to the `server` directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the server:
   ```
   npm run start
   # or
   yarn start
   ```

The server will run on [http://localhost:3001](http://localhost:3001).

---

## Subgraph (graphs)

### Overview

The subgraph in `graphs/` is configured for querying location data on the blockchain.

### Setup

1. Navigate to the `graphs` directory:
   ```
   cd graphs
   ```

2. Authenticate with The Graph CLI:
   ```
   graph auth --product hosted-service <access-token>
   ```

3. Deploy the subgraph:
   ```
   graph deploy --product hosted-service <your-username>/<subgraph-name>
   ```

---

## Notes

- Ensure all environment variables are properly configured before running the app.
- For further customization or setup, refer to the detailed documentation for each tool or framework used.
