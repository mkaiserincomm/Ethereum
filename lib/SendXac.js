import Common from 'ethereumjs-common';

const Web3 = require("web3");

const solc = require("solc");

const Tx = require('ethereumjs-tx').Transaction;

const keythereum = require("keythereum"); //const Common        = require('ethereumjs-common');


const web3 = new Web3("ws://localhost:3304");
const account = "0x18ecbbb365a076c30793412503ba21a01e637922";
const datadir = "/home/mkaiser/.ethereum/04";
const password = "P@ssw0rd";
let keyObject = keythereum.importFromFile(account, datadir);
let key = keythereum.recover(password, keyObject); //var abi = ABI of the Contract
//var bytecode = Bytecode of compiled contract
//var Contract = web3.eth.contract(abi)

const customCommon = Common.forCustomChain('mainnet', {
  name: 'my-private-blockchain',
  networkId: 1,
  chainId: 42
});
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.utils.toHex(gasPrice);
const gasLimitHex = web3.utils.toHex(3000000);
var tra = {
  gasPrice: gasPriceHex,
  gasLimit: gasLimitHex,
  //data: bytecode,
  from: account,
  value: "0x10000000000"
};
const tx = new EthereumTx(tra, {
  common: customCommon
}); //var tx = new Tx(tra, {chain: 0x3ad});

tx.sign(key);
var stx = tx.serialize();
web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('contract creation tx: ' + hash);
});