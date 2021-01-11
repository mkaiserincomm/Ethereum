module.exports = {
    fromAccount:        '0xe6ac52c3478865ff3f181e29b02a5caab2f6eb57',
    toAccount:          '0xe6c8a578fc2af3793bc65c8b71f085cc31cc16c4',
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