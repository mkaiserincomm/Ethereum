#!/bin/bash
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
