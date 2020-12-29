// https://ethereum.stackexchange.com/questions/12830/how-to-get-private-key-from-account-address-and-password

var keythereum = require("keythereum");
var datadir = "/home/mkaiser/.ethereum/04";
var address= "0x18ecbbb365a076c30793412503ba21a01e637922";
const password = "P@ssw0rd";

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));