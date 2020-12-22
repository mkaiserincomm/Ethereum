var entity = require("./entity.js");

// Wrapper class for REST requst
module.exports = class request {
    constructor(nodeURL, method, params) {
        this.path = 'http://' + nodeURL + '/';
        this.method = 'POST';
        this.headers = { 'Content-Type': 'application/json' };
        this.entity = new entity(method, params);
    }
}