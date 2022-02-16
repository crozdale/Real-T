var realToken = artifacts.require("./realToken.sol");

module.exports = function (deployer) {
    deployer.deploy(realToken);
};
