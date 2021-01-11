# Ethereum
This runs against a private Ethereum network as described below

## Install Prerequisites
### NodeJS
* DO NOT install it via "apt install", you will get the wrong version
* Download the archive
    ```
    wget https://nodejs.org/dist/v15.5.1/node-v15.5.1-linux-x64.tar.xz
    ```    
* Unzip the binary archive
    ```    
    sudo mkdir -p /usr/local/lib/nodejs    
    sudo tar -xJvf node-v15.5.1-linux-x64.tar.xz -C /usr/local/lib/nodejs`
    ```
* Set the path
    ```
    export PATH=/usr/local/lib/nodejs/node-v15.5.1-linux-x64/bin:$PATH
    ```
* Add `export PATH=/usr/local/lib/nodejs/node-v15.5.1-linux-x64/bin:$PATH` to the end of `~/.bashrc`
* Test it
    * Run `node --version` and confirm that the version is 15.5.1
### Ethereum
* Install Ethereum    
    ```
    sudo apt-get install software-properties-common
    sudo add-apt-repository -y ppa:ethereum/ethereum
    sudo apt-get update
    sudo apt-get install ethereum
    ```
### Truffle
* Install Truffle    
    ```
    sudo chown --recursive $USER /usr/local/lib/nodejs
    sudo chgrp --recursive $USER /usr/local/lib/nodejs    

    npm install -g truffle
    ```
### Solidity Compilers
* Install Solidity
    ```
    sudo npm install -g solc
    ```

## Configure Genesis Block
### Create the genesis block
* Create the genesis block
    ```
    mkdir ~/ethereum-network
    cd ~/ethereum-network
    nano genesis.json
    ```
### Paste the following into the genesis.json
* Contents of genesis block
    ```
    {
        "config": {
            "chainId": 2019,
            "homesteadBlock": 0,
            "eip150Block": 0,
            "eip155Block": 0,
            "eip158Block": 0,
            "byzantiumBlock": 0,
            "constantinopleBlock": 0,
            "petersburgBlock": 0,
            "ethash": {}
        },
        "alloc": {},
        "difficulty" : "200",
        "gasLimit" : "99999999999999"
    }
    ```
### Initialize
* Initialize the genesis block
    ```
    geth --datadir ~/ethereum-network/dataDir init ~/ethereum-network/genesis.json
    ```

## Use the network   
### Start the network
* Start the network
    ```
    geth --port 4321 --networkid 1234 --datadir=./dataDir  --rpc --rpcport 8543 --rpcaddr 127.0.0.1  --rpcapi "eth,net,web3,personal,miner"
    ```
* Attach to the network
    ```
    geth attach http://127.0.0.1:8543
    ```
* Create accounts (while attached to geth).  Make 2 if these. Copy these accounts into `config.js`
    ```
    personal.newAccount('P@$$w0rd')
    ```
* Start mining (while attached to geth)
    ```
    miner.start()
    ```
* Check Balance
    ```
    web3.fromWei(eth.getBalance(eth.coinbase), "ether")
    ```