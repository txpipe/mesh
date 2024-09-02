import { HexBlob } from "@cardano-sdk/util";
import { CardanoQueryClient, CardanoSubmitClient } from "@utxorpc/sdk";
import { Utxo } from "@utxorpc/sdk/lib/cardano";
import * as Cardano from "@utxorpc/spec/lib/utxorpc/v1alpha/cardano/cardano_pb.js";

import {
  AccountInfo,
  Asset,
  AssetMetadata,
  BlockInfo,
  bytesToHex,
  IFetcher,
  ISubmitter,
  Protocol,
  toBytes,
  TransactionInfo,
  UTxO,
} from "@meshsdk/common";
import {
  Address,
  AssetId,
  AssetName,
  Datum,
  DatumHash,
  PlutusData,
  PlutusV1Script,
  PlutusV2Script,
  PolicyId,
  Script,
  TokenMap,
  TransactionId,
  TransactionInput,
  TransactionOutput,
  Value,
} from "@meshsdk/core-cst";

export class U5CProvider implements IFetcher, ISubmitter {
  private queryClient: CardanoQueryClient;
  private submitClient: CardanoSubmitClient;

  constructor({
    url,
    headers,
  }: {
    url: string;
    headers?: Record<string, string>;
  }) {
    this.queryClient = new CardanoQueryClient({
      uri: url,
      headers,
    });

    this.submitClient = new CardanoSubmitClient({
      uri: url,
      headers,
    });
  }

  async submitTx(tx: string): Promise<string> {
    const txHash = await this.submitClient.submitTx(toBytes(tx));
    return bytesToHex(txHash);
  }

  async fetchProtocolParameters(epoch: number): Promise<Protocol> {
    const rpcPParams = await this.queryClient.readParams();
    if (rpcPParams === undefined || rpcPParams === null) {
      throw new Error(`Error fetching protocol parameters`);
    }
    return this._rpcPParamsToCorePParams(rpcPParams);
  }

  async fetchAddressUTxOs(address: string, asset?: string): Promise<UTxO[]> {
    const addressObj = Address.fromString(address);
    const addressBytes = toBytes(addressObj!.toBytes().toString())

    let utxoSearchResult: Utxo[];

    if (asset) {
      const policyId = asset.substring(0, 56);
      const name = asset.length > 56 ? asset : undefined;

      if (name) {
        // Call searchUtxosByAddressWithAsset if both policyId and name are present
        const assetNameBytes = toBytes(name);;
        utxoSearchResult = await this.queryClient.searchUtxosByAddressWithAsset(
          addressBytes,
          undefined,
          assetNameBytes,
        );
      } else {
        // Call searchUtxosByAddressWithAsset using only the policyId
        const policyIdBytes = toBytes(policyId);
        utxoSearchResult = await this.queryClient.searchUtxosByAddressWithAsset(
          addressBytes,
          policyIdBytes,
          undefined,
        );
      }
    } else {
      // Call searchUtxosByAddress if no asset is provided
      utxoSearchResult =
        await this.queryClient.searchUtxosByAddress(addressBytes);
    }

    return utxoSearchResult.map((item) => {
      const input = new TransactionInput(
        TransactionId(Buffer.from(item.txoRef.hash).toString("hex")),
        BigInt(item.txoRef.index),
      );

      const output = this._rpcTxOutToCoreTxOut(item.parsedValued!);

      return this.toUTxO({ input, output }, address);
    });
  }

  private toUTxO(
    output: { input: TransactionInput; output: TransactionOutput },
    address: string,
  ): UTxO {
    const { input, output: txOutput } = output;

    return {
      input: {
        outputIndex: Number(input.index()),
        txHash: input.transactionId().toString(),
      },
      output: {
        address: address,
        amount: [
          { unit: "lovelace", quantity: txOutput.amount().coin().toString() },
          ...(txOutput.amount().multiasset()
            ? Array.from(txOutput.amount().multiasset() ?? new Map()).map(
                ([assetId, quantity]) => ({
                  unit: assetId,
                  quantity: quantity.toString(),
                }),
              )
            : []),
        ],
        dataHash: txOutput.datum()?.asDataHash() ?? undefined,
        plutusData: txOutput.datum()?.asInlineData()?.toString() ?? undefined,
        scriptRef: txOutput.scriptRef()?.toString() ?? undefined,
        scriptHash: txOutput.scriptRef()?.hash() ?? undefined,
      },
    };
  }
  private _rpcTxOutToCoreTxOut(
    rpcTxOutput: Cardano.TxOutput,
  ): TransactionOutput {
    const output = new TransactionOutput(
      Address.fromBytes(HexBlob.fromBytes(rpcTxOutput.address)),
      this._rpcTxOutToCoreValue(rpcTxOutput),
    );

    if (rpcTxOutput.datum !== undefined) {
      if (
        rpcTxOutput.datum?.originalCbor &&
        rpcTxOutput.datum.originalCbor.length > 0
      ) {
        const inlineDatum = Datum.newInlineData(
          PlutusData.fromCbor(
            HexBlob.fromBytes(rpcTxOutput.datum.originalCbor),
          ),
        );
        output.setDatum(inlineDatum);
      } else if (rpcTxOutput.datum?.hash && rpcTxOutput.datum.hash.length > 0) {
        const datumHash = Datum.newDataHash(
          DatumHash(Buffer.from(rpcTxOutput.datum.hash).toString("hex")),
        );
        output.setDatum(datumHash);
      }
    }

    if (rpcTxOutput.script !== undefined) {
      if (rpcTxOutput.script.script.case === "plutusV1") {
        const cbor = rpcTxOutput.script.script.value;
        output.setScriptRef(
          Script.newPlutusV1Script(
            PlutusV1Script.fromCbor(HexBlob.fromBytes(cbor)),
          ),
        );
      }
      if (rpcTxOutput.script.script.case === "plutusV2") {
        const cbor = rpcTxOutput.script.script.value;
        output.setScriptRef(
          Script.newPlutusV2Script(
            PlutusV2Script.fromCbor(HexBlob.fromBytes(cbor)),
          ),
        );
      }
    }

    return output;
  }

  private _rpcTxOutToCoreValue(rpcTxOutput: Cardano.TxOutput): Value {
    return new Value(
      BigInt(rpcTxOutput.coin),
      this._rpcMultiAssetOutputToTokenMap(rpcTxOutput.assets),
    );
  }

  private _rpcMultiAssetOutputToTokenMap(
    multiAsset: Cardano.Multiasset[],
  ): TokenMap {
    const tokenMap: TokenMap = new Map();
    multiAsset.forEach((ma) => {
      ma.assets.forEach((asset) => {
        const assetId = AssetId.fromParts(
          PolicyId(Buffer.from(ma.policyId).toString("hex")),
          AssetName(Buffer.from(asset.name).toString("hex")),
        );

        const quantity = BigInt(asset.outputCoin);

        if (tokenMap.has(assetId)) {
          tokenMap.set(assetId, tokenMap.get(assetId)! + quantity);
        } else {
          tokenMap.set(assetId, quantity);
        }
      });
    });
    return tokenMap;
  }

  private _rpcPParamsToCorePParams(rpcPParams: Cardano.PParams): Protocol {
    return {
      epoch: 1, 
      minFeeA: Number(rpcPParams.minFeeConstant), 
      minFeeB: Number(rpcPParams.minFeeCoefficient), 
      maxBlockSize: Number(rpcPParams.maxBlockBodySize),
      maxTxSize: Number(rpcPParams.maxTxSize),
      maxBlockHeaderSize: Number(rpcPParams.maxBlockHeaderSize),
      keyDeposit: Number(rpcPParams.stakeKeyDeposit), 
      decentralisation: Number(rpcPParams.poolInfluence?.numerator),
      minPoolCost: String(rpcPParams.minPoolCost),
      priceMem: Number(rpcPParams.prices?.memory),
      priceStep: Number(rpcPParams.prices?.steps), 
      maxTxExMem: String(rpcPParams.maxExecutionUnitsPerTransaction?.memory), 
      maxTxExSteps: String(rpcPParams.maxExecutionUnitsPerTransaction?.steps), 
      maxBlockExMem: String(rpcPParams.maxExecutionUnitsPerBlock?.memory), 
      maxBlockExSteps: String(rpcPParams.maxExecutionUnitsPerBlock?.steps),
      maxValSize: Number(rpcPParams.maxValueSize),
      collateralPercent: Number(rpcPParams.collateralPercentage), 
      maxCollateralInputs: Number(rpcPParams.maxCollateralInputs),
      coinsPerUtxoSize: Number(rpcPParams.coinsPerUtxoByte), 
      minFeeRefScriptCostPerByte: Number(rpcPParams.minFeeConstant), 
    };
  }

  fetchUTxOs(hash: string): Promise<UTxO[]> {
    throw new Error("Method not implemented.");
  }

  fetchAccountInfo(address: string): Promise<AccountInfo> {
    throw new Error("Method not implemented.");
  }

  fetchAssetAddresses(
    asset: string,
  ): Promise<{ address: string; quantity: string }[]> {
    throw new Error("Method not implemented.");
  }

  fetchAssetMetadata(asset: string): Promise<AssetMetadata> {
    throw new Error("Method not implemented.");
  }

  fetchBlockInfo(hash: string): Promise<BlockInfo> {
    throw new Error("Method not implemented.");
  }

  fetchCollectionAssets(
    policyId: string,
    cursor?: number | string,
  ): Promise<{ assets: Asset[]; next?: string | number | null }> {
    throw new Error("Method not implemented.");
  }

  fetchHandle(handle: string): Promise<object> {
    throw new Error("Method not implemented.");
  }

  fetchHandleAddress(handle: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  fetchTxInfo(hash: string): Promise<TransactionInfo> {
    throw new Error("Method not implemented.");
  }
}
