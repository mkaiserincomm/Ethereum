const SmartContract     = require('./SmartContract');
const Config            = require('./config');

module.exports = class Voter extends SmartContract {
    constructor () {
        super(Config.contractFilenames['voter']);            
    }

    async vote(optionName) {        
        return await this.sendContract(this.instance.methods.vote(optionName));
    }

    //get message() {   
    //    return (async () => { return await this.callContract(this.instance.methods.message); })();        
    //}
}