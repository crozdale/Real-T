var HDWalletProvider = require('@truffle/hdwallet-provider')
var mnemonic = 'promote useless exclude conduct deny system disagree victory want heavy zone notice';// 12 key words we generated before
var publicNode = 'https://public-node.testnet.rsk.co:443';
module.exports = {
  networks: {
    rsk: {
      provider: () =>
        new HDWalletProvider(mnemonic, publicNode),
      network_id: '*',
      gas: 2500000,
      gasPrice: 60000000
    }
  },
  compilers : {
     solc: {
       version: "0.5.8",
       evmVersion: "byzantium"
     }
  }
}