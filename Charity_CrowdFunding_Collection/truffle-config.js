require("dotenv").config

const HDWalletProvider = require('@truffle/hdwallet-provider');

//const MNEMONIC= "word1 word2 word3.... word12"
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
    ,
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURAID}`),
      //provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/PUT_YOUR_ID_HERE`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      
      },
  },
  mocha: {

  },  
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};