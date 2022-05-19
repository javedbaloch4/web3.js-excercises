var Tx = require("ethereumjs-tx").Transaction;

const Web3 = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/efbf2836e9e149759a94388f58c65214"
);

// Create our own accounts on Rapston test network
// console.log(web3.eth.accounts.create());

const account1 = "0x02B1efDDAD6fB2F87E45Aa965FAE4569Ba77200C";
const account2 = "0xDBBa7f527214f0c6d5B44dCa2fDa061F8F20Ced5";

const privateKey1 = Buffer.from(
  "be245bdf45a1fce13aa2e10d48ea420d84715437fcce4695013126582b2acdbe",
  "hex"
);
const privateKey2 = Buffer.from(
  "0184e8733049d8cff9cb7deb7c62ec5b0b0ffc0b99a1659652f88219e730cee1",
  "hex"
);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Transaction object
  const txObject = {
    from: account1,
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  // Sign the transaction
  const tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Deploy the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if (txHash != undefined) {
      console.log(txHash);
    } else {
      console.log(err);
    }
  });
});
