require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomiclabs/hardhat-etherscan");
// require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    // 'base-sepolia': {
    //   url: process.env.BASE_GOERLI,
    //   accounts: [process.env.PRIVATE_KEY],
    //   gasPrice: 35000000000,
    //   saveDeployments: true,
    // },
    'scroll-sepolia': {
      url: process.env.SCROLL_SEPOLIA_TESTNET,
      accounts: [process.env.PRIVATE_KEY]
    },    
    'arbitrum-sepolia': {
      url: process.env.ARB_SEPOLIA_TESTNET,
      accounts: [process.env.PRIVATE_KEY]
    },
    'polyzkevm-tnet': {
      url: process.env.POLY_ZKEVM_TESTNET,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  'etherscan': {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  customChains: [
    // {
    //   network: "base-goerli",
    //   chainId: 84531,
    //   urls: {
    //    apiURL: "https://api-goerli.basescan.org/api",
    //    browserURL: "https://goerli.basescan.org"
    //   }
    // },
    // {
    //   network: 'scroll-sepolia',
    //   chainId: 534351,
    //   urls: {
    //     // apiURL: 'https://sepolia-blockscout.scroll.io/api',
    //     apiURL: "https://sepolia-rpc.scroll.io",
    //     browserURL: 'https://sepolia-blockscout.scroll.io',
    //   },
      
    // },
    {
      network: 'polyzkevm-tnet',
      chainId: 1442,
      urls: {
        apiURL: "https://rpc.public.zkevm-test.net",
        browserURL: 'https://zkevm.polygonscan.com',
      },
    },
    {
      network: 'arbitrum-sepolia',
      chainId: 421614,
      urls: {
        apiURL: "https://sepolia-rollup.arbitrum.io/rpc",
        browserURL: 'https://sepolia.arbiscan.io',
      },
    },
  ]

};