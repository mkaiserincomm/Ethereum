const Web3      = require('web3');

let web3_1= new Web3('ws://localhost:3301');
let web3_2= new Web3('ws://localhost:3302');
let web3_3= new Web3('ws://localhost:3303');
let web3_4= new Web3('ws://localhost:3304');

async function updateNodes()
{        
    let eNode1 = await web3_1.admin.getNodeInfo();
    let eNode2 = await web3_2.eth.getNodeInfo();
    let eNode3 = await web3_3.eth.getNodeInfo();
    let eNode4 = await web3_4.eth.getNodeInfo();

    console.log(eNode1);

    await web3_2.admin.addPeer(eNode1.enr);
    await web3_3.admin.addPeer(eNode1.enr);
    await web3_4.admin.addPeer(eNode1.enr);

    await web3_1.admin.addPeer(eNode2.enr);
    await web3_3.admin.addPeer(eNode2.enr);
    await web3_4.admin.addPeer(eNode2.enr);

    await web3_1.admin.addPeer(eNode3.enr);
    await web3_2.admin.addPeer(eNode3.enr);
    await web3_4.admin.addPeer(eNode3.enr);

    await web3_1.admin.addPeer(eNode4.enr);
    await web3_2.admin.addPeer(eNode4.enr);
    await web3_3.admin.addPeer(eNode4.enr);

    console.log(await web3_1.admin.peers());
    console.log(await web3_2.admin.peers());
    console.log(await web3_3.admin.peers());
    console.log(await web3_4.admin.peers());
}

function error(e) { console.error(e); }

updateNodes().catch(error);
