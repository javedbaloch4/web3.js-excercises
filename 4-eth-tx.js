const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/a6ebd6ef4a634405902896e770dbf05b"
);
const account1 = "0x02B1efDDAD6fB2F87E45Aa965FAE4569Ba77200C";
const account2 = "0xDBBa7f527214f0c6d5B44dCa2fDa061F8F20Ced5";
const key1 = Buffer.from(
  "be245bdf45a1fce13aa2e10d48ea420d84715437fcce4695013126582b2acdbe",
  "hex"
);
const key2 = Buffer.from(
  "0184e8733049d8cff9cb7deb7c62ec5b0b0ffc0b99a1659652f88219e730cee1",
  "hex"
);
// console.log(process.env.PRIVATE_KEY_1);
// console.log(process.env.PRIVATE_KEY_2);
web3.eth.getBalance(account1, (err, result) => {
  console.log("Account 1 balance: " + web3.utils.toWei(result, "ether"));
});
web3.eth.getBalance(account2, (err, result) => {
  console.log("Account 2 balance: " + web3.utils.toWei(result, "ether"));
});
web3.eth.getTransactionCount(account1, (err, txCount) => {
  // 1- Build the transaction
  const txObject = {
    from: account1,
    nonce: web3.utils.toHex(txCount), // had to be hexadecimal
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };
  // 2- sign the transactin
  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(key1);
  //serilize and convert to hex
  const serilizedTransaction = tx.serialize();
  const raw = "0x" + serilizedTransaction.toString("hex");
  // 3- broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash", txHash);
    console.log(err);
  });
});
