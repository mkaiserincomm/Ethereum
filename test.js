var admin       = require("./admin.js");
var net         = require("./net.js");
var eth         = require("./eth.js");
var miner       = require("./miner.js");
var personal    = require("./personal.js");

// Main routine
async function apiTest()
{
    let net1        = new net('127.0.0.1:8101');
    let admin1      = new admin('127.0.0.1:8101');
    let miner1      = new miner('127.0.0.1:8101');
    let eth1        = new eth('127.0.0.1:8101');
    let eth2        = new eth('127.0.0.1:8102');
    let eth3        = new eth('127.0.0.1:8103');
    let personal1   = new personal('127.0.0.1:8101');

    var enode = await admin1.getEnode();

    console.log("net::version:      ", await net1.version());
    console.log("net::listening:    ", await net1.listening());
    console.log("net::peerCount:    ", await net1.peerCount());
    console.log();
    console.log("admin::dataDir:    ", await admin1.dataDir());
    console.log("admin::getEnode:   ", enode.enr);
    console.log();    

    (await eth1.accounts()).forEach(async function (element) {        
        console.log("eth1::getBalance ", element, " ", (await eth1.getBalance(element, 'latest')));
    });
    (await eth2.accounts()).forEach(async function (element) {        
        console.log("eth2::getBalance ", element, " ", (await eth2.getBalance(element, 'latest')));
    });
    (await eth3.accounts()).forEach(async function (element) {        
        console.log("eth3::getBalance ", element, " ", (await eth3.getBalance(element, 'latest')));
    });
    

    miner1.start();
}

// Global error handler
function error(e) { console.error(e); }

// Call the main routine
apiTest().catch(error);
