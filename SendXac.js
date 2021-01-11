///////////////////////////////////////////
// Move ETH from one account to another
///////////////////////////////////////////

const Web3          = require("web3");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;
const Config        = require('./config');

// Connect to the network
const web3          = new Web3(Config.url);

// Stuff to get the private key
const keyObject     = keythereum.importFromFile(Config.fromAccount, Config.dataDir);
const privateKey    = keythereum.recover(Config.password, keyObject);

// Use our private chain
const customCommon  = Common.forCustomChain(Config.customChain.baseChain, Config.customChain.chainParams, Config.customChain.hardFork );

// Price limits
const gasPrice      = web3.eth.gasPrice;
const gasPriceHex   = web3.utils.toHex(gasPrice);
const gasLimitHex   = web3.utils.toHex(3000000);
const valueHex      = web3.utils.toHex(web3.utils.toWei("1"));

async function Xac()
{        
    let txParams = {
        from:       Config.fromAccount,
        to:         Config.toAccount,
        gasLimit:   gasLimitHex,
        gasPrice:   gasPriceHex,
        nonce:      "0x" + (await web3.eth.getTransactionCount(Config.fromAccount)).toString(16),
        value:      valueHex
    };
        
    let tx = new Tx(txParams, { common: customCommon });
    tx.sign(privateKey);
    let stx = tx.serialize();
    let receipt = await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'));
    console.log(receipt);             
}

Xac();