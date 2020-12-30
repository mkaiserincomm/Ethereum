const Web3          = require("web3");
const solc          = require("solc");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;

// Connect to the network
const web3          = new Web3("ws://localhost:3304");

// Stuff to get the private key
const fromAccount   = "0x18ecbbb365a076c30793412503ba21a01e637922";
const toAccount     = "0xcdf97451671304407b362c2a354bfc71b287a969";
const datadir       = "/home/mkaiser/.ethereum/04";
const password      = "P@ssw0rd";
const keyObject     = keythereum.importFromFile(fromAccount, datadir);
const privateKey    = keythereum.recover(password, keyObject);

// Use our private chain
const customCommon  = Common.forCustomChain('mainnet', { name: 'my-private-blockchain', networkId: 1, chainId:0x3ad }, 'petersburg' );

// Price limits
const gasPrice      = web3.eth.gasPrice;
const gasPriceHex   = web3.utils.toHex(gasPrice);
const gasLimitHex   = web3.utils.toHex(3000000);
const valueHex      = web3.utils.toHex(14000000000000000);

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