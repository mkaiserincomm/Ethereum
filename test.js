var rest = require('rest');
var mime = require ('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

// Wrapper class for REST requst
function request(nodeURL, method, params)
{
    this.path = 'http://' + nodeURL + '/';
    this.method = 'POST';
    this.headers = { 'Content-Type': 'application/json' };
    this.entity = new entity(method, params);
}

// Wrapper class for Ethereum REST API request body
function entity(method, params)
{
    this.jsonrpc = '2.0';
    this.method = method;
    this.params = params;
    this.id = 1;
}

// Wrapper class for Ethereum Admin API
function admin(client, nodeURL) {
    this.nodeURL = nodeURL;
    this.client = client;
    this.getEnode =     async function ()       { let response = await this.client(new request(this.nodeURL, 'admin_nodeInfo', []));        return response.entity.enode;   };
    this.addPeer =      async function(peer)    { let response = await this.client(new request(this.nodeURL, 'admin_addPeer', [peer]));     return response.entity.result;  };
    this.peers =        async function peers()  { let response = await this.client(new request(this.nodeURL, 'admin_peers', []));           return response.entity.result;  };
    this.removePeer =   async function(peer)    { let response = await this.client(new request(this.nodeURL, 'admin_removePeer', [peer]));  return response.entity.result;  };
}

// Wrapper class for Ethereum Net API
class net {
    constructor(client, nodeURL) {
        this.nodeURL = nodeURL;
        this.client = client;                
    }

    async version()     { let response = await this.client(new request(this.nodeURL, 'net_version', []));   return response.entity.result; };
    async listening()   { let response = await this.client(new request(this.nodeURL, 'net_listening', [])); return response.entity.result; };
    async peerCount()   { let response = await this.client(new request(this.nodeURL, 'net_peerCount', [])); return response.entity.result; };
}

async function updateNodes()
{
    var client = rest
        .wrap(mime)
        .wrap(errorCode, { code: 500 });

    let admin1 = new admin(client, '127.0.0.1:8101');
    let admin2 = new admin(client, '127.0.0.1:8102');
    let admin3 = new admin(client, '127.0.0.1:8103');

    let eNode1 = await admin1.getEnode();
    let eNode2 = await admin2.getEnode();
    let eNode3 = await admin3.getEnode();

    await admin2.addPeer(eNode1);
    await admin3.addPeer(eNode1);

    await admin1.addPeer(eNode2);
    await admin3.addPeer(eNode2);

    await admin1.addPeer(eNode3);
    await admin2.addPeer(eNode3);

    console.log(await admin1.peers());
    console.log(await admin2.peers());
    console.log(await admin3.peers());

    let net1 = new net(client, '127.0.0.1:8101');
    console.log();
    console.log("Version:    ", await net1.version());
    console.log("Listening:  ", await net1.listening());
    console.log("Peer Count: ", await net1.peerCount());
}

function error(response)
{
    console.log(response);
}

updateNodes();
