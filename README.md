# solana-hi-roller
Dice rolling app built on the lighting-fast Solana blockchain. Leveraging Chainlink for random number generation.

## Setup / Deployment instructions

Install Node dependencies
```
npm install
```

Create a temporary wallet in your local directory
```
solana-keygen new --outfile ./id.json
```

Fuel your wallet with some SOL for DevNet deploy
```
solana airdrop 2 --keypair ./id.json --url devnet &&
solana airdrop 2 --keypair ./id.json --url devnet
```

Build the program to generate files: `/solana-hi-roller/target/deploy/solana_hi_roller.so` and keypair `solana-hi-roller/target/deploy/solana_hi_roller-keypair.json`
```
anchor build
```

After building, get the ProgramId with: `solana address -k ./target/deploy/solana_hi_roller-keypair.json`

Modify files `programs/solana-hi-roller/src/lib.rs` and `Anchor.toml`. Replace lines `declare_id!("Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi");` and `solana_hi_roller = "Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi"` with your ProgramId generated after `anchor build`

Build again with the new ProgramId:
```
anchor build
```

Deploy the program:
```
anchor deploy --provider.wallet ./id.json --provider.cluster devnet
```

Modify file `tests/solana-hi-roller.ts`, replace
```
const programId = new anchor.web3.PublicKey("Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi")
```
with your ProgramId derived from the previous step.

Test your deployment with
```
anchor test --skip-deploy
```

Example output:
```
$ solana-hi-roller/node_modules/.bin/ts-mocha -p ./tsconfig.json -t 1000000 'tests/**/*.ts'


  anchor-hello-world
Fetching transaction logs...
[
  'Program Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi invoke [1]',
  'Program log: Instruction: Execute',
  'Program 11111111111111111111111111111111 invoke [2]',
  'Program 11111111111111111111111111111111 success',
  'Program CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT invoke [2]',
  'Program log: Instruction: Query',
  'Program CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT consumed 2916 of 186828 compute units',
  'Program return: CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT qJ4KAEJ/GGIAAAAA60pJEwIAAAAAAAAAAAAAAA==',
  'Program CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT success',
  'Program CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT invoke [2]',
  'Program log: Instruction: Query',
  'Program CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT consumed 2910 of 180184 compute units',
  'Program return: CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT CQAAAFNPTCAvIFVTRA==',
  'Program CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT success',
  'Program log: Dice rolled: 1. This random number was derived from SOL / USD price',
  'Program Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi consumed 25815 of 200000 compute units',
  'Program return: Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi CQAAAFNPTCAvIFVTRA==',
  'Program Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi success'
]
Your transaction signature 5ESSnKmtvGrJNjfMBRBwagY8CE1ca61Q8Xb4T1fJtaijfShQWF69cySgr2JoJqzvEPhrLHwoMfHpqkSeLtTke1cW
    ✔ Rolls dice! (1775ms)


  1 passing (2s)

✨  Done in 7.53s.
```

We have our dice number!
```
Program log: Dice rolled: 1. This random number was derived from SOL / USD price
```
