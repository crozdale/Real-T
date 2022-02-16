const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'eye pond bind cliff slam fiscal electric snake famous avoid multiply pill';

module.exports = {
  networks: {
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/d6a1a55bef28495987454dc594226412")
      },
      network_id: 1,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/79187a542151484b9cc1d23c2ed5081a")
      },
      network_id: "*",
      gas: 2000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};