var admin = require("./admin.js");
var net = require("./net.js");

async function updateNodes()
{    
    let admin1 = new admin('127.0.0.1:8101');
    let admin2 = new admin('127.0.0.1:8102');
    let admin3 = new admin('127.0.0.1:8103');

    let eNode1 = await admin1.getEnode();
    let eNode2 = await admin2.getEnode();
    let eNode3 = await admin3.getEnode();

    await admin2.addPeer(eNode1.enr);
    await admin3.addPeer(eNode1.enr);

    await admin1.addPeer(eNode2.enr);
    await admin3.addPeer(eNode2.enr);

    await admin1.addPeer(eNode3.enr);
    await admin2.addPeer(eNode3.enr);

    console.log(await admin1.peers());
    console.log(await admin2.peers());
    console.log(await admin3.peers());
}

function error(e) { console.error(e); }

updateNodes().catch(error);
