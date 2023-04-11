import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan"
const INFURA_API_KEY = ""
const SEPOLIA_PRIVATE_KEY = ""
module.exports = {
  solidity: "0.8.17",
  networks: {
    BNBtestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: "12 words"}
    },
    etherscan: {
      apiKey: {
        bscTestnet: 'api'
      }
    }
  }
};