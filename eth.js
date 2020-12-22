var rest = require('rest');
var mime = require ('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var request = require("./request.js");

module.exports = class eth {        
    constructor(nodeURL) {
        this.nodeURL    = nodeURL;
        this.client     = rest.wrap(mime).wrap(errorCode, { code: 500 });
    }
    
    /*
    async start() { 
        let response = await this.client(new request(this.nodeURL, 'miner_start', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }
    */
}