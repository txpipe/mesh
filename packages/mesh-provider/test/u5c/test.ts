// Step #1
// Import necessary modules from Mesh SDK and U5CProvider
import { Transaction } from '@meshsdk/core-cst';
import { U5CProvider } from '../../src/u5c';
import { MeshWallet } from '@meshsdk/core';

// Step #2
// Configuration for U5CProvider
// Replace the URL with your local or hosted UTXO provider endpoint
const config = {
    url: "http://localhost:50051",
    headers: {
        "dmtr-api-key": "" // Add your API key here if required
    }
};

// Step #3
// Instantiate the U5CProvider with the provided configuration
const provider = new U5CProvider(config);

// Step #4
// Create a new MeshWallet instance using a mnemonic
// Specify the network ID (0 for testnet, 1 for mainnet)
// The wallet uses the U5CProvider for fetching and submitting transactions
const wallet = new MeshWallet({
    networkId: 0, // Testnet
    fetcher: provider,
    submitter: provider,
    key: {
        type: 'mnemonic',
        words: [
            "solution", "solution", "solution", "solution", "solution", "solution", 
            "solution", "solution", "solution", "solution", "solution", "solution", 
            "solution", "solution", "solution", "solution", "solution", "solution", 
            "solution", "solution", "solution", "solution", "solution", "solution"
        ],
    },
});

// Step #5
// Create a new transaction that sends 5 ADA to a specified address
const tx = new Transaction({ initiator: wallet })
    .sendLovelace(
        'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',
        '5000000' // 5 ADA
    );

// Step #6
// Build the transaction to prepare it for signing
const unsignedTx = await tx.build();

// Step #7
// Sign the transaction using the wallet's private key
const signedTx = await wallet.signTx(unsignedTx);

// Step #8
// Submit the signed transaction to the blockchain network
const txHash = await wallet.submitTx(signedTx);

// Optional: Print the transaction hash
console.log("Transaction Hash:", txHash);
