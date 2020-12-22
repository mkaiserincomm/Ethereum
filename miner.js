var rest = require('rest');
var mime = require ('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var request = require("./request.js");

module.exports = class miner {        
    constructor(nodeURL) {
        this.nodeURL    = nodeURL;
        this.client     = rest.wrap(mime).wrap(errorCode, { code: 500 });
    }
    
    async start() { 
        let response = await this.client(new request(this.nodeURL, 'miner_start', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async stop() { 
        let response = await this.client(new request(this.nodeURL, 'miner_stop', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async setEtherbase(address) { 
        let response = await this.client(new request(this.nodeURL, 'miner_setEtherbase', [address]));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async setExtra(extra) { 
        let response = await this.client(new request(this.nodeURL, 'miner_setExtra', [extra]));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async setGasPrice(gasPrice) { 
        let response = await this.client(new request(this.nodeURL, 'miner_setGasPrie', [gasPrice]));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async getHashRate() { 
        let response = await this.client(new request(this.nodeURL, 'miner_getHashRate', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }
}