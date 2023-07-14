const {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");
const fs = require("fs");
async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const secret = JSON.parse(fs.readFileSync("secretkey.json") || "[]");
  const secretKey = new Uint8Array(secret);

  const ownerKeypair = Keypair.fromSecretKey(secretKey);

  console.log(ownerKeypair.publicKey.toBase58());
  const publickey = ownerKeypair.publicKey;
  const recipientAddress = "FbcBWzcezM77bzx7CxK7EgtGk6VBTeqBPBwJkd17amov";
  const recipient = new PublicKey(recipientAddress);

  console.log(recipient.toBase58());
  const transaction = new Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: publickey,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * 0.1,
  });

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    ownerKeypair,
  ]);
  console.log(signature);
}

main();
