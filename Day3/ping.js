// const web3 = require("@solana/web3.js");
// const fs = require("fs");

// const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
// const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

// async function main() {
//   const payer = initializeKeypair();
//   const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
//   await pingProgram(connection, payer);
// }

// function initializeKeypair() {
//   const secret = JSON.parse(fs.readFileSync("secretkey.json") || "[]");
//   const secretKey = Uint8Array.from(secret);
//   const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
//   return keypairFromSecretKey;
// }

// async function pingProgram(connection, payer) {
//   const transaction = new web3.Transaction();

//   const programId = new web3.PublicKey(PROGRAM_ADDRESS);
//   const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

//   const instruction = new web3.TransactionInstruction({
//     keys: [
//       {
//         pubkey: programDataPubkey,
//         isSigner: false,
//         isWritable: true,
//       },
//     ],
//     programId,
//   });

//   transaction.add(instruction);

//   const signature = await web3.sendAndConfirmTransaction(
//     connection,
//     transaction,
//     [payer]
//   );

//   console.log(signature);
// }

// main().catch(console.error);
const web3 = require("@solana/web3.js");
const borsh = require("@project-serum/borsh");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

function initializeSignerKeypair() {
  if (!process.env.PRIVATE_KEY) {
    console.log("Creating .env file");
    const signer = web3.Keypair.generate();
    fs.writeFileSync(
      ".env",
      "PRIVATE_KEY=[" + signer.secretKey.toString() + "]"
    );
    return signer;
  }

  const secret = JSON.parse(process.env.PRIVATE_KEY || "");
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecretKey;
}

function airdropSolIfNeeded(signer, connection) {
  return connection.getBalance(signer.publicKey).then((balance) => {
    console.log("Current balance is", balance / web3.LAMPORTS_PER_SOL);
    if (balance < web3.LAMPORTS_PER_SOL) {
      console.log("Airdropping 1 SOL...");
      return connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL);
    }
    return Promise.resolve();
  });
}

const movieInstructionLayout = borsh.struct([
  borsh.u8("variant"),
  borsh.str("title"),
  borsh.u8("rating"),
  borsh.str("description"),
]);

function sendTestMovieReview(signer, programId, connection) {
  let buffer = Buffer.alloc(1000);
  const movieTitle = "Inception" + Math.random() * 1000000;
  movieInstructionLayout.encode(
    {
      variant: 0,
      title: movieTitle,
      rating: 5,
      description: "A mind-blowing movie",
    },
    buffer
  );

  buffer = buffer.slice(0, movieInstructionLayout.getSpan(buffer));

  return web3.PublicKey.findProgramAddress(
    [signer.publicKey.toBuffer(), Buffer.from(movieTitle)],
    programId
  ).then(([pda]) => {
    console.log("PDA is:", pda.toBase58());

    const transaction = new web3.Transaction();

    const instruction = new web3.TransactionInstruction({
      programId: programId,
      data: buffer,
      keys: [
        {
          pubkey: signer.publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
    });

    transaction.add(instruction);
    return web3.sendAndConfirmTransaction(connection, transaction, [signer]);
  });
}

function main() {
  const signer = initializeSignerKeypair();

  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  return airdropSolIfNeeded(signer, connection).then(async () => {
    const movieProgramId = new web3.PublicKey(
      "2hGTPBshz5ThSdv2suiyw3mn86SYpTL2gma9Bdw1AR51"
    );
    let hash = await sendTestMovieReview(signer, movieProgramId, connection);
    console.log(hash);
  });
}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
