const {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"));
async function getBalanceWeb3(address) {
  return connection.getBalance(address);
}
const publickey = new PublicKey("2KgowxogBrGqRcgXQEmqFvC3PGtCu66qERNJevYW8Ajh");
getBalanceWeb3(publickey).then((balance) => {
  console.log(balance / LAMPORTS_PER_SOL);
});
//1 sol=1000000000

//making the connection wiht the json rpc
