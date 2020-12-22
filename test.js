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
    let personal1   = new personal('127.0.0.1:8101');  
    
    var enode = await admin1.getEnode();

    console.log("version:       ", await net1.version());
    console.log("listening:     ", await net1.listening());
    console.log("peerCount:     ", await net1.peerCount());
    console.log();
    console.log("dataDir:       ", await admin1.dataDir());    
    console.log("getEnode:      ", enode.enr);
    
    /*
    admin1.startRPC("localhost", 8101, "", "eth,net,web3")
    .then (function (result) { 
        console.log("startRPC:       success");
    }).catch(function(e){
        console.log("startRPC:      ", e.message);
    });
    */  
    
    miner1.start();    
}

// Global error handler
function error(e) { console.error(e); }

// Call the main routine
apiTest().catch(error);