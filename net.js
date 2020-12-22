var rest = require('rest');
var mime = require ('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var request = require("./request.js");

// Wrapper class for Ethereum Net API
module.exports = class net {
    constructor(nodeURL) {
        this.nodeURL    = nodeURL;
        this.client     = this.client = rest.wrap(mime).wrap(errorCode, { code: 500 });
    }

    async version()         { let response = await this.client(new request(this.nodeURL, 'net_version', []));           return response.entity.result; };
    async listening()       { let response = await this.client(new request(this.nodeURL, 'net_listening', []));         return response.entity.result; };
    async peerCount()       { let response = await this.client(new request(this.nodeURL, 'net_peerCount', []));         return response.entity.result; };
}