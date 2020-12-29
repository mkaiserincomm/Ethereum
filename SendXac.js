const Web3          = require("web3");
const solc          = require("solc");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;

const web3          = new Web3("ws://localhost:3304");
    
const account       = "0x18ecbbb365a076c30793412503ba21a01e637922";
const datadir       = "/home/mkaiser/.ethereum/04";
const password      = "P@ssw0rd";
const keyObject     = keythereum.importFromFile(account, datadir);
const key           = keythereum.recover(password, keyObject);

async function Xac()
{
    let nonce = (await web3.eth.getTransactionCount('0x18ecbbb365a076c30793412503ba21a01e637922')).toString(16);
    let keyObject = keythereum.importFromFile(address, datadir);
    let privateKey = keythereum.recover(password, keyObject);

    console.log(nonce);

    const txParams = {
        from: "0x18ecbbb365a076c30793412503ba21a01e637922",
        to: "0xcdf97451671304407b362c2a354bfc71b287a969",
        gasLimit: "0x21000",
        gasPrice: "0x200",
        nonce: "0x" + nonce,
        value: "0x10000000000"
    }    
    
    const tx = new Tx(txParams);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();


    
    //signed_tx = await web3.eth.signTransaction(tx, privateKey)
    //tx_hash = await web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    //tx_receipt = await web3.eth.waitForTransactionReceipt(tx_hash)   
    //console.log(tx_receipt)
    
}

let nonce = (await web3.eth.getTransactionCount('0x18ecbbb365a076c30793412503ba21a01e637922')).toString(16);

//var abi = ABI of the Contract
//var bytecode = Bytecode of compiled contract
//var Contract = web3.eth.contract(abi)

const customCommon = Common.forCustomChain('mainnet', { name: 'my-private-blockchain', networkId: 1, chainId:0x3ad }, 'petersburg' );

const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.utils.toHex(gasPrice);
const gasLimitHex = web3.utils.toHex(3000000);

var tra = {
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    //data: bytecode,
    from: account,
    value: "0x10000000000",
    nonce: "0x" + nonce,
};

const tx = new Tx(tra, { common: customCommon });
tx.sign(key);

var stx = tx.serialize();
web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }
    console.log('contract creation tx: ' + hash);
});

