const Web3          = require('web3');
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const datadir       = "/home/mkaiser/.ethereum/04";
const address       = "0x18ecbbb365a076c30793412503ba21a01e637922";
const password      = "P@ssw0rd";

let web3 = new Web3('ws://localhost:3304');
web3.setProvider('ws://localhost:3304');

async function Test()
{
    (await web3.eth.getAccounts()).forEach(async function(element) 
        {
            let balance = await web3.eth.getBalance(element, "latest");
            console.log(element, " ", balance);
        }
    );    
}

async function Xac2()
{       
    let receipt = await web3.eth.sendTransaction(
        {
            from: address,
            to: "0xcdF97451671304407b362C2a354BFC71b287a969",            
            value: "0x10000000000"
        }  
    )

    console.log(receipt)
}

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

Xac().catch(console.error);