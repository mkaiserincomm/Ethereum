#!/bin/bash
runnode () {
  geth \
	--datadir="~/.ethereum/$1/"	\
	--verbosity 3 \
	--port 303$1 \
	--ws \
	--ws.port 33$1 \
	--ws.api "admin, db, eth, net, web3, personal, miner, debug" \
    --http \
    --http.port 81$1 \
    --http.api "admin, db, eth, net, web3, personal, miner, debug" \
	--etherbase 0x18ecbbb365a076c30793412503ba21a01e637922 $2 $3 $4 $5 \
   2>> ~/.ethereum/$1.log &
}

runnode 01 --nat extip:10.0.0.117
sleep 3s
export bootnode=`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/01/ | sed 's/.\(.*\)/\1/' | sed 's/\(.*\)./\1/' `
echo $bootnode
runnode 02 --nat extip:10.0.0.117 --bootnodes $bootnode 
runnode 03 --nat extip:10.0.0.117 --bootnodes $bootnode 
runnode 04 --nat extip:10.0.0.117 --bootnodes $bootnode 

geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/01/ `)" attach --datadir ~/.ethereum/02/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/01/ `)" attach --datadir ~/.ethereum/03/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/01/ `)" attach --datadir ~/.ethereum/04/

geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/02/ `)" attach --datadir ~/.ethereum/01/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/02/ `)" attach --datadir ~/.ethereum/03/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/02/ `)" attach --datadir ~/.ethereum/04/

geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/03/ `)" attach --datadir ~/.ethereum/01/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/03/ `)" attach --datadir ~/.ethereum/02/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/03/ `)" attach --datadir ~/.ethereum/04/

geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/04/ `)" attach --datadir ~/.ethereum/01/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/04/ `)" attach --datadir ~/.ethereum/02/
geth --exec "admin.addPeer(`geth --exec "admin.nodeInfo.enr" attach --datadir ~/.ethereum/04/ `)" attach --datadir ~/.ethereum/03/

geth --exec "miner.start()" attach --datadir ~/.ethereum/01



