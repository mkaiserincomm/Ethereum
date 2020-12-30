const Web3          = require("web3");
const solc          = require("solc");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;

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

// Price limits
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.utils.toHex(gasPrice);
const gasLimitHex = web3.utils.toHex(3000000);

async function signContract()
{    
    //var abi = ABI of the Contract
    //var bytecode = Bytecode of compiled contract
    //var Contract = web3.eth.contract(abi)
    
    let tra = {
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        //data: bytecode,
        from: account,        
        nonce: "0x" + (await web3.eth.getTransactionCount(account)).toString(16),
    };

    let tx = new Tx(tra, { common: customCommon });
    tx.sign(privateKey);

    let stx = tx.serialize();
    let hash = await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'));    
    console.log('contract creation tx: ' + hash);    
}

signContract();
