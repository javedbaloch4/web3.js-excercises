const Web3 = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/efbf2836e9e149759a94388f58c65214"
);

// Get the Block data
// web3.eth
//   .getBlock(
//     "0x70a000e18479e15901027fa04825d1031cbd7b830effbd7cab263836e755064d"
//   )
//   .then((block) => {
//     console.log({
//       blockHash: block.hash,
//       blockNumber: block.number,
//       size: block.size,
//       gasLimit: block.gasLimit,
//       gasPrice: block.gasPrice,
//     });
//   });

// Get the last 10 blocks

web3.eth.getBlockNumber().then((latest) => {
  // Get the latest 10 blcoks
  for (let i = 0; i < 10; i++) {
    web3.eth.getBlock(latest - i).then((block) => {
      console.log(block.hash);
    });
  }
});
