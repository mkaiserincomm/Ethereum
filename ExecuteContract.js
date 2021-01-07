///////////////////////////////////////////
// Call a contract
///////////////////////////////////////////

const HelloWorld    = require('./HelloWorld');
const Voter         = require('./Voter');

async function main()
{
    console.log('main');
        
    let helloWorld  = new HelloWorld();
    //let voter       = new Voter();
    
    let result = await helloWorld.Hello();
    console.log('\tHello:', result.status);

    let receipt = await helloWorld.message;
    console.log('\tmessage:', receipt);         
}

main();
