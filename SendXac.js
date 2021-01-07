///////////////////////////////////////////
// Move ETH from one account to another
///////////////////////////////////////////

const Web3          = require("web3");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;

// Connect to the network
const web3          = new Web3("http://localhost:8543");

// Stuff to get the private key
const fromAccount   = "0xe6ac52c3478865ff3f181e29b02a5caab2f6eb57";
const toAccount     = "0xe6c8a578fc2af3793bc65c8b71f085cc31cc16c4";

const datadir       = "/home/mkaiser/ethereum-network/dataDir";
const password      = "P@$$w0rd!";
const keyObject     = keythereum.importFromFile(fromAccount, datadir);
const privateKey    = keythereum.recover(password, keyObject);

// Use our private chain
const customCommon  = Common.forCustomChain('mainnet', {networkId: 1, chainId:2019 }, 'petersburg' );

// Price limits
const gasPrice      = web3.eth.gasPrice;
const gasPriceHex   = web3.utils.toHex(gasPrice);
const gasLimitHex   = web3.utils.toHex(3000000);
const valueHex      = web3.utils.toHex(web3.utils.toWei("1"));

async function Xac()
{        
    let txParams = {
        from:       fromAccount,
        to:         toAccount,
        gasLimit:   gasLimitHex,
        gasPrice:   gasPriceHex,
        nonce:      "0x" + (await web3.eth.getTransactionCount(fromAccount)).toString(16),
        value:      valueHex
    };
        
    let tx = new Tx(txParams, { common: customCommon });
    tx.sign(privateKey);
    let stx = tx.serialize();
    let receipt = await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'));
    console.log(receipt);             
}

Xac();