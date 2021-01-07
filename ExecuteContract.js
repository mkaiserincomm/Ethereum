///////////////////////////////////////////
// Call a contract
///////////////////////////////////////////

const Web3                  = require("web3");
const Tx                    = require('ethereumjs-tx').Transaction;
const keythereum            = require("keythereum");
const Common                = require('ethereumjs-common').default;
const fs                    = require('fs');

//const Utils               = require('web3-utils');
//const solc                = require("solc");
//const util                = require('util');
//const crypto              = require('crypto');

// Load the contract file
let rawdata                 = fs.readFileSync('../truffle/build/contracts/HelloWorld.json');
const HelloWorldContract    = JSON.parse(rawdata);

// Connect to the network
const web3                  = new Web3("http://localhost:8543");

// Stuff to get the private key
const datadir               = "/home/mkaiser/ethereum-network/dataDir";
const password              = "P@$$w0rd!";
var account;
var keyObject;
var privateKey;

// Stuff about our contract
const contractName      = HelloWorldContract.contractName;
const contractAccount   = HelloWorldContract.networks['1234'].address;
const abi               = HelloWorldContract.abi;    
const bytecode          = HelloWorldContract.bytecode;

// Use our private chain
const customCommon = Common.forCustomChain('mainnet', {networkId: 1, chainId:2019 }, 'petersburg' );

// Initialize the private keys
async function init()
{
    account     = await web3.eth.getCoinbase();44    
    keyObject   = keythereum.importFromFile(account, datadir);
    privateKey  = keythereum.recover(password, keyObject);
}

// Do a "call".  Read data from a contract.
async function callContract(method)
{              
    let result      = await method().call();
    return result;    
}

// Do a "send". Change data in a contract.
async function sendContract(contractInstance, method)
{   
    // Sign the transaction     
    let tra         = { 
        from: account, 
        to: contractInstance.options.address, 
        gas: 2000000, 
        data: method.encodeABI(), 
        nonce: "0x" + (await web3.eth.getTransactionCount(account)).toString(16) 
    };    
    let tx          = new Tx(tra, { common: customCommon });
    tx.sign(privateKey);
    
    // Send the transaction
    let stx         = tx.serialize();
    let receipt     = await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'));
    return receipt;
}

async function main()
{
    console.log('main');   
    
    let contractInstance    = new web3.eth.Contract(abi, contractAccount);    
    
    // Initialize the variables
    await init();    
    
    // "Send" a contract
    let receipt = await sendContract(contractInstance, contractInstance.methods.message);
    console.log('\tsendContract:', receipt);
    
    // "Call" a contract
    let result = await callContract(contractInstance.methods.Hello());
    console.log('\tcallContract:', result);
}

main();

