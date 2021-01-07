const SmartContract     = require('./SmartContract');
const Config            = require('./config');

module.exports = class HelloWorld extends SmartContract {
    constructor () {
        super(Config.contractFilenames['helloWorld']);            
    }

    async Hello() {        
        return await this.sendContract(this.instance.methods.Hello());
    }

    get message() {   
        return (async () => { return await this.callContract(this.instance.methods.message); })();        
    }
}