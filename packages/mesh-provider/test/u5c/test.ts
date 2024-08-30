import { U5CProvider } from '../../src/u5c';
import { Protocol, UTxO } from "@meshsdk/common";

// Configuration for U5CProvider, adjust as needed
const config = {
    url: "http://localhost:50051",
    headers: {
      "dmtr-api-key": ""
    }
};

// Instantiate the U5CProvider
const provider = new U5CProvider(config);

// Sample address and asset for testing
const sampleAddress = 'addr_test1qzdnkrpd5pqux2ctyrwj8rmzztcft92c79lj4k97dra74vhx8qcgyj7m7ge3sv5rrz4kvzkyfz9htrmttvuj4r5jau0qwl8umu';
// Replace with actual asset ID
const sampleAsset = '50ff9c0ff3472de54d42a6e7757580bfbdf2415d84e526ec37f90fc3'; 
// CborHex of Tx
const sampleTx = '84a300d9010281825820eb3b13c78f7a9b45d6db2d28bf97b8e9a344bf1428e65f2d5716903fcee74b1000018182581d6067618f8be0d882dbfe2dd5268c9901b81f9443cf0b84f61ab34c42ef1a0042007c021a000292b1a100d90102818258208e271e56aa9322ea6394f1d33873a0f82bb9a0a7536beb285a9822c43e4994a25840a4fe461feb468ecca4d28f05ec396d35ba6003fc0fc46ca5045f0c2298e5b5ca2fef1c129fcd78058347e9afc0eeedd7f6f6ac59f3d0b82354af7e348e96b402f5f6'; // Replace with actual serialized transaction

async function testFetchUTxOsWithAsset() {
  try {
    const utxos: UTxO[] = await provider.fetchAddressUTxOs(sampleAddress, sampleAsset);
    console.log('Fetched UTxOs with asset:', JSON.stringify(utxos, null, 2)); 
    
  } catch (error) {
    console.error('Error fetching UTxOs with asset:', error.message);
  }
}

async function testFetchUTxOsWithoutAsset() {
  try {
    const utxos: UTxO[] = await provider.fetchAddressUTxOs(sampleAddress);
    console.log('Fetched UTxOs without asset:', JSON.stringify(utxos, null, 2)); 
    
  } catch (error) {
    console.error('Error fetching UTxOs without asset:', error.message);
  }
}

async function testFetchProtocolParameters() {
  try {
      const protocolParams: Protocol = await provider.fetchProtocolParameters(1);
      console.log('Fetched Protocol Parameters:', JSON.stringify(protocolParams, null, 2));
  } catch (error) {
      console.error('Error fetching protocol parameters:', error.message);
  }
}

async function testSubmitTx() {
  try {
    const txHash: string = await provider.submitTx(sampleTx);
    console.log('Submitted Transaction, Hash:', txHash);
  } catch (error) {
    console.error('Error submitting transaction:', error.message);
  }
}
// Run the tests
testFetchUTxOsWithAsset();
// testFetchUTxOsWithoutAsset();
// testFetchProtocolParameters();
// testSubmitTx();