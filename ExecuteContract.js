///////////////////////////////////////////
// Call a contract
///////////////////////////////////////////

const HelloWorld            = require('./HelloWorld');

// Constants
const datadir               = "/home/mkaiser/ethereum-network/dataDir";
const password              = "P@$$w0rd!";
const url                   = "http://localhost:8543";
const contractFilename      = "../truffle/build/contracts/HelloWorld.json";

async function main()
{
    console.log('main');
    
    let helloWorld = new HelloWorld(url, contractFilename, datadir, password);
    
    let result = await helloWorld.Hello();
    console.log('\tHello:', result.status);

    let receipt = await helloWorld.message;
    console.log('\tmessage:', receipt);         
}

main();
