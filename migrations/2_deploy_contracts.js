var HelloWorld = artifacts.require("./HelloWorld.sol");
var Voter = artifacts.require("./voting-prototype.sol");
module.exports = function(deployer) {
   console.log(Voter);
   deployer.deploy(HelloWorld);
   deployer.deploy(Voter);
};