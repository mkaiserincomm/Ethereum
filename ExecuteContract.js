const Web3          = require("web3");
const solc          = require("solc");
const Tx            = require('ethereumjs-tx').Transaction;
const keythereum    = require("keythereum");
const Common        = require('ethereumjs-common').default;
const Utils         = require('web3-utils');
const fs            = require('fs');
const util          = require('util');
const crypto        = require('crypto');

// Connect to the network
const web3          = new Web3("ws://localhost:3304");

// Stuff to get the private key
const account       = "0x18ecbbb365a076c30793412503ba21a01e637922";
const toAccount     = "0xcdf97451671304407b362c2a354bfc71b287a969";
const datadir       = "/home/mkaiser/.ethereum/04";
const password      = "P@ssw0rd";
const keyObject     = keythereum.importFromFile(account, datadir);
const privateKey    = keythereum.recover(password, keyObject);

// Stuff about our contract
const contractName      = "SimpleCoin";
const abi               = [{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"coinBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const bytecode          = "0x608060405234801561001057600080fd5b506040516101e63803806101e68339818101604052602081101561003357600080fd5b505133600090815260208190526040902055610192806100546000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a9059cbb1461003b578063fabde80c14610069575b600080fd5b6100676004803603604081101561005157600080fd5b506001600160a01b0381351690602001356100a1565b005b61008f6004803603602081101561007f57600080fd5b50356001600160a01b031661014a565b60408051918252519081900360200190f35b3360009081526020819052604090205481106100bc57600080fd5b6001600160a01b03821660009081526020819052604090205481810110156100e357600080fd5b33600081815260208181526040808320805486900390556001600160a01b03861680845292819020805486019055805185815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35050565b6000602081905290815260409020548156fea26469706673582212204a5e593c146e046e73b00685dab8871687f182a66c05974ba663db64de69bcde64736f6c63430007040033";

// Use our private chain
const customCommon = Common.forCustomChain('mainnet', { name: 'my-private-blockchain', networkId: 1, chainId:0x3ad }, 'petersburg' );

async function useContract(contractAddress)
{
    console.log('useContract');
    console.log('\tcontractAddress:', contractAddress);
    let contractInstance = new web3.eth.Contract(abi, contractAddress);
    console.log('\tcontractInstance.methods:', contractInstance.methods);

    let coinBalance = contractInstance.methods.coinBalance;
    console.log('\tcoinBalance:', coinBalance);

    let balance = await coinBalance(account).call();
    console.log('\tbalance:', balance);
}

async function signContract()
{
    console.log('signContract');

    // Price limits
    let gasPrice    = await web3.eth.getGasPrice();
    let gasPriceHex = web3.utils.toHex(gasPrice);
    let gasLimitHex = web3.utils.toHex(500000);

    console.log('\tgasPrice:', gasPrice);

    let encodedParameters = web3.eth.abi.encodeParameters(
        [ 'uint256'],
        [ '1000000' ]
      ).slice(2);
      console.log ('\tencodedParameters:', encodedParameters);

    let nonce = "0x" + (await web3.eth.getTransactionCount(account)).toString(16);    
    console.log('\tnonce:', nonce);
    
    // Build transaction to post contract                
    let tra = {
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        //data: bytecode + encodedParameters,
        data: bytecode,
        from: account,        
        nonce: nonce,
    };

    let tx = new Tx(tra, { common: customCommon });
    tx.sign(privateKey);

    let stx = tx.serialize();
    let receipt = await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'));
    console.log('\tContract Address:', receipt.contractAddress);
    console.log('\tTransaction Hash:', receipt.transactionHash);

    return receipt;

    //web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
    //    if (err) { console.log(err); return; }
    //    console.log('contract creation tx: ' + hash);
    //});
}

async function main()
{
    console.log('main');    
    let receipt = await signContract();
    await useContract(receipt.contractAddress);
}

main();
/*
    .then(function (e,r) {
        if (e) {console.error(e); return; }
        console.log(r);
    });
*/
