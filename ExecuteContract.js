///////////////////////////////////////////
// Call a contract
///////////////////////////////////////////

const HelloWorld            = require('./HelloWorld');

async function main()
{
    console.log('main');
        
    let helloWorld = new HelloWorld();
    
    let result = await helloWorld.Hello();
    console.log('\tHello:', result.status);

    let receipt = await helloWorld.message;
    console.log('\tmessage:', receipt);         
}

main();
