module.exports = {
    password:           'P@$$w0rd!',
    url:                'http://localhost:8543',
    dataDir:            '/home/mkaiser/ethereum-network/dataDir',
    gas:                2000000,
    networkId:          '1234',
    contractFilenames: {
        helloWorld:     './build/contracts/HelloWorld.json',
        voter:          './build/contracts/Voter.json'
    },
    customChain: {
        baseChain: 'mainnet', 
        chainParams: {
            networkId: 1, 
            chainId: 2019 
        },
        hardFork: 'petersburg',
    }    
}