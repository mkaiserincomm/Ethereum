const Web3          = require("web3");
const solc          = require("solc");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;
const Utils         = require('web3-utils');

// Connect to the network
const web3          = new Web3("ws://localhost:3304");

// Stuff to get the private key
const account       = "0x18ecbbb365a076c30793412503ba21a01e637922";
const datadir       = "/home/mkaiser/.ethereum/04";
const password      = "P@ssw0rd";
const keyObject     = keythereum.importFromFile(account, datadir);
const privateKey    = keythereum.recover(password, keyObject);

// Use our private chain
const customCommon = Common.forCustomChain('mainnet', { name: 'my-private-blockchain', networkId: 1, chainId:0x3ad }, 'petersburg' );

async function signContract()
{

    // Price limits
    let gasPrice    = web3.eth.gasPrice;
    let gasPriceHex = web3.utils.toHex(gasPrice);
    let gasLimitHex = web3.utils.toHex(3000000);
    
    console.log(gasPrice);

    let abi = [{"inputs":[],"name":"last_completed_migration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"completed","type":"uint256"}],"name":"setCompleted","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    let bytecode = "0x6080604052600080546001600160a01b0319163317905534801561002257600080fd5b5061016f806100326000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610060578063fdacd57614610084575b600080fd5b61004e6100a3565b60408051918252519081900360200190f35b6100686100a9565b604080516001600160a01b039092168252519081900360200190f35b6100a16004803603602081101561009a57600080fd5b50356100b8565b005b60015481565b6000546001600160a01b031681565b6000546001600160a01b031633146101015760405162461bcd60e51b81526004018080602001828103825260338152602001806101076033913960400191505060405180910390fd5b60015556fe546869732066756e6374696f6e206973207265737472696374656420746f2074686520636f6e74726163742773206f776e6572a26469706673582212209f5553ed992f499a292b26c3731a64e1c1fd81e117c9b4ed59413d23ca3d822964736f6c63430007040033";    
    let contract = new web3.eth.Contract(abi);            

    let tra = {
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        data: bytecode,
        from: account,        
        nonce: "0x" + (await web3.eth.getTransactionCount(account)).toString(16),
    };

    let tx = new Tx(tra, { common: customCommon });
    tx.sign(privateKey);

    let stx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
        if (err) { console.log(err); return; }
        console.log('contract creation tx: ' + hash);
    });
}

signContract();
