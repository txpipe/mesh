import { Transaction } from '@meshsdk/core-cst';
import { U5CProvider } from '../../src/u5c';
import { MeshWallet } from '@meshsdk/core';

// Configuration for U5CProvider, adjust as needed
const config = {
    url: "http://localhost:50051",
    headers: {
      "dmtr-api-key": ""
    }
};

// Instantiate the U5CProvider
const provider = new U5CProvider(config);

const wallet = new MeshWallet({
  networkId: 0, // 0: testnet, 1: mainnet
  fetcher: provider,
  submitter: provider,
  key: {
    type: 'mnemonic',
    words: ["solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution"],
  },
});

const tx = new Transaction({ initiator: wallet })
  .sendLovelace(
    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',
    '5000000'
  );

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
