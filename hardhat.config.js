require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-abi-exporter");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.18",
  networks: {
    test: {
      url: "http://127.0.0.1:8545",
    },
    klaytn: {
      chainId: 8217,
      url: "https://klaytn02.fandom.finance",
      accounts: [process.env.PRIVATE_KEY],
    },
    klaytnTest: {
      chainId: 1001,
      url: "https://api.baobab.klaytn.net:8651",
      accounts: [process.env.PRIVATE_KEY],
    },
    polygonMumbai: {
      chainId: 80001,
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      chainId: 137,
      url: "https://polygon.llamarpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    sepoliaTest: {
      chainId: 11155111,
      url: "https://rpc.sepolia.org",
      accounts: [process.env.PRIVATE_KEY],
    },
    goerliTest: {
      chainId: 5,
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PRIVATE_KEY],
    },
    ethereum: {
      chainId: 1,
      url: "https://eth.llamarpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    evmosTest: {
      chainId: 9000,
      url: "https://eth.bd.evmos.dev:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
    bscTest: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc: {
      chainId: 56,
      url: "https://bsc-dataseed1.ninicoin.io",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_KEY,
      goerli: process.env.ETHERSCAN_KEY,
      polygon: process.env.POLYGONSCAN_KEY,
      polygonMumbai: process.env.POLYGONSCAN_KEY,
    },
  },
  abiExporter: {
    path: "./app/abi",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
  },
};
