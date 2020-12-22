var rest = require('rest');
var mime = require ('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var request = require("./request.js");

// Wrapper class for Ethereum Admin API
module.exports = class admin {        
    constructor(nodeURL) {
        this.nodeURL    = nodeURL;
        this.client     = rest.wrap(mime).wrap(errorCode, { code: 500 });
    }
    
    async getEnode() { 
        let response = await this.client(new request(this.nodeURL, 'admin_nodeInfo', []));        
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async addPeer(peer) { 
        let response = await this.client(new request(this.nodeURL, 'admin_addPeer', [peer]));     
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async peers() { 
        let response = await this.client(new request(this.nodeURL, 'admin_peers', []));           
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async removePeer(peer) { 
        let response = await this.client(new request(this.nodeURL, 'admin_removePeer', [peer]));  
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async dataDir() { 
        let response = await this.client(new request(this.nodeURL, 'admin_datadir', []));         
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async startRPC(host, port, cors, apis) { 
        let response = await this.client(new request(this.nodeURL, 'admin_startRPC', [host, port, cors, apis]));         
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async startWS(host, port, cors, apis) { 
        let response = await this.client(new request(this.nodeURL, 'admin_startWS', [host, port, cors, apis]));         
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async stopRPC() { 
        let response = await this.client(new request(this.nodeURL, 'admin_stopRPC', []));         
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }

    async stopWS() { 
        let response = await this.client(new request(this.nodeURL, 'admin_stopWS', []));         
        if (response.entity.error) throw response.entity.error;
        return response.entity.result; 
    }
}