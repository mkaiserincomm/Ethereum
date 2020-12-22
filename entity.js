// Wrapper class for Ethereum REST API request body
module.exports = class entity {
    constructor(method, params) {
        this.jsonrpc = '2.0';
        this.method = method;
        this.params = params;
        this.id = 1;
    }
}