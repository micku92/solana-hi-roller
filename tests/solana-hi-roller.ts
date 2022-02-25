import * as anchor from '@project-serum/anchor';


const CHAINLINK_PROGRAM_ID = "CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT";
const CHAINLINK_FEED = "EdWr4ww1Dq82vPe8GFjjcVPo2Qno3Nhn6baCgM3dCy28";
describe('anchor-hello-world', () => {
  it('Rolls dice!', async () => {
    const provider = anchor.Provider.env();
    // Configure the client to use the local cluster.
    anchor.setProvider(provider);
    // Configure the cluster.
    anchor.setProvider(provider);

    // Address of the deployed program.
    const programId = new anchor.web3.PublicKey("Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi")
    // Generate the program client from IDL.
    const idl = JSON.parse(
        require("fs").readFileSync("./target/idl/roll_dice.json", "utf8")
    );
    const program = new anchor.Program(idl, programId);

    const priceFeedAccount = anchor.web3.Keypair.generate();

    let tx = await program.rpc.execute({
      accounts: {
        dice: priceFeedAccount.publicKey,
        user: provider.wallet.publicKey,
        chainlinkFeed: CHAINLINK_FEED,
        chainlinkProgram: CHAINLINK_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      options: {commitment: "confirmed"},
      signers: [priceFeedAccount],
    });

    // Print transaction logs + signature
    console.log("Fetching transaction logs...");
    let t = await provider.connection.getTransaction(tx, {commitment:'confirmed'});
    console.log(t.meta.logMessages);
    console.log("Your transaction signature", tx);
  });

});