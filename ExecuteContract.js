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
const web3          = new Web3(http://localhost:8543");

// Stuff to get the private key
//const account       = "0x18ecbbb365a076c30793412503ba21a01e637922";
//const toAccount     = "0xcdf97451671304407b362c2a354bfc71b287a969";
//const datadir       = "/home/mkaiser/.ethereum/04";
//const password      = "P@$$w0rd!";
//const keyObject     = keythereum.importFromFile(account, datadir);
//const privateKey    = keythereum.recover(password, keyObject);

// Stuff about our contract
const contractName      = "HelloWorld";
const abi               = [
    {
      "constant": true,
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "Hello",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const bytecode          = "0x608060405234801561001057600080fd5b5061028e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063bcdfe0d51461003b578063e21f37ce14610045575b600080fd5b6100436100c8565b005b61004d610116565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561008d578082015181840152602081019050610072565b50505050905090810190601f1680156100ba5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6040518060400160405280600c81526020017f48656c6c6f20576f726c64210000000000000000000000000000000000000000815250600090805190602001906101139291906101b4565b50565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101ac5780601f10610181576101008083540402835291602001916101ac565b820191906000526020600020905b81548152906001019060200180831161018f57829003601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101f557805160ff1916838001178555610223565b82800160010185558215610223579182015b82811115610222578251825591602001919060010190610207565b5b5090506102309190610234565b5090565b61025691905b8082111561025257600081600090555060010161023a565b5090565b9056fea265627a7a723158204168720a1a76fbdb9de10b10fd1fb314e89a12954cd3929132e9e4eedf9cf07964736f6c63430005100032";

// Use our private chain
const customCommon = Common.forCustomChain('mainnet', { name: 'my-private-blockchain', networkId: 1, chainId:1 }, 'petersburg' );

async function useContract(contractAddress)
{
    console.log('useContract');
    console.log('\tcontractAddress:', contractAddress);
    let contractInstance = new web3.eth.Contract(abi, contractAddress);
    console.log('\tcontractInstance.methods:', contractInstance.methods);

    let hello = contractInstance.methods.Hello;
    console.log('\thello:', hello);

    let result = await hello().call();
    console.log('\tresult:', result);
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
    //let receipt = await signContract();
    await useContract("0x5c692415B50f361c4ec2a9f4B49BB8708a434e28");
}

main();
/*
    .then(function (e,r) {
        if (e) {console.error(e); return; }
        console.log(r);
    });
*/
