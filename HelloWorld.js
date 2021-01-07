const SmartContract = require('./SmartContract');

module.exports = class HelloWorld extends SmartContract {
    async Hello() {        
        return await this.sendContract(this.instance.methods.Hello());
    }

    get message() {   
        return (async () => { return await this.callContract(this.instance.methods.message); })();        
    }
}