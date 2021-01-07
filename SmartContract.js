const Web3                  = require("web3");
const Tx                    = require('ethereumjs-tx').Transaction;
const Common                = require('ethereumjs-common').default;
const keythereum            = require("keythereum");
const fs                    = require('fs');
const Config                = require('./config');

module.exports = class SmartContract {
    #dataDir        = "";
    #password       = "";
    #web3           = null;        
    
    instance   = null;
    
    constructor(contractFilename, url = Config.url, dataDir = Config.dataDir, password = Config.password) {        

        // Store properties
        this.#dataDir               = dataDir;
        this.#password              = password;

        // Connect to Ethereum
        this.#web3                  = new Web3(url);        

        // Get the contract
        let buffer                  = fs.readFileSync(contractFilename);
        let contractTemplate        = JSON.parse(buffer);
        let contractAccount         = contractTemplate.networks[Config.networkId].address;
        let abi                     = contractTemplate.abi;          
        this.instance               = new this.#web3.eth.Contract(abi, contractAccount);                                           
    }

    // Do a "call".  Read data from a contract.
    async callContract(method)
    {              
        let result = await method().call();
        return result;    
    }

    // Do a "send". Change data in a contract.
    async sendContract(method)
    {   
        // Get the private Key
        let account     = await this.#web3.eth.getCoinbase();
        let keyObject   = keythereum.importFromFile(account, this.#dataDir);
        let privateKey  = keythereum.recover(this.#password, keyObject);

        // Define our private chain
        let customCommon = Common.forCustomChain(Config.customChain.baseChain, Config.customChain.chainParams, Config.customChain.hardFork);
        
        // Sign the transaction     
        let tra = { 
            from:   account, 
            to:     this.instance.options.address, 
            gas:    Config.gas, 
            data:   method.encodeABI(), 
            nonce: "0x" + (await this.#web3.eth.getTransactionCount(account)).toString(16) 
        };    
        let tx = new Tx(tra, { common: customCommon });
        tx.sign(privateKey);
        
        // Send the transaction
        let stx         = tx.serialize();
        let receipt     = await this.#web3.eth.sendSignedTransaction('0x' + stx.toString('hex'));
        return receipt;
    }
}