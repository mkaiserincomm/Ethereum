var rest = require('rest');
var mime = require ('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var request = require("./request.js");

module.exports = class eth {        
    constructor(nodeURL) {
        this.nodeURL    = nodeURL;
        this.client     = rest.wrap(mime).wrap(errorCode, { code: 500 });
    }
    
    async accounts() { 
        let response = await this.client(new request(this.nodeURL, 'eth_accounts', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async mining() { 
        let response = await this.client(new request(this.nodeURL, 'eth_mining', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async getBalance(account, block) { 
        let response = await this.client(new request(this.nodeURL, 'eth_getBalance', [ account, block ]));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

}