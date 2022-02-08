const bcrypt = require("bcrypt");

class Block {
  // a block has header and body ,
  // where header contain block id, hash,previous hash ,nonce,markel tree,deficulty,target bit,timestamp
  //body has all the transaction happen in block time stamp
  constructor(blockId, previousHash, transactionData) {
    this.blockId = blockId;
    this.timeStamp = Date.now();
    this.previousHash = previousHash;
    this.blockHash = this.getHash();
    this.blockData = transactionData;
  }
  getHash() {
    return bcrypt.hashSync(
      String(
        this.blockId +
          this.timeStamp +
          this.previousHash +
          JSON.stringify(this.blockData)
      ),
      10
    );
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }
  // this method will add blocks into the blockchain array.
  addBlock(data) {
    let blockId = this.chain.length;
    let previousBlockHash =
      this.chain.length !== 0
        ? this.chain[this.chain.length - 1].blockHash
        : ""; // it the blockhash of the previous block from the chain

    let block = new Block(blockId, previousBlockHash, data);
    this.chain.push(block);
  }
}

const MyVeryFirstBlockchain = new BlockChain();
MyVeryFirstBlockchain.addBlock({ from: "Sneha", to: "Ashish", amount: 20 });
MyVeryFirstBlockchain.addBlock({ from: "Sneha", to: "Ashish", amount: 200 });
// MyVeryFirstBlockchain.addBlock({})

console.log(JSON.stringify(MyVeryFirstBlockchain, null, 6));
