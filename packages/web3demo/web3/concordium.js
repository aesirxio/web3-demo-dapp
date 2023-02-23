import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import {
  deserializeReceiveReturnValue,
  toBuffer,
  SchemaVersion,
  AccountTransactionType,
  CcdAmount,
} from "@concordium/web-sdk";

export default class Concordium {
  client = null;
  jsonRpcClient = null;
  account = null;
  rawNFTModuleSchema = "//";
  contractName = "";
  contractIndex = 0;
  contractSubindex = 0;

  /*********************
   * Public methods
   *********************/

  async accountConnect() {
    const client = await this.loadClient();
    this.account = await client.connect();

    return this.account;
  }

  /*********************
   * Internal methods
   *********************/

  async loadClient() {
    self = this;
    if (null === this.client) {
      this.client = await detectConcordiumProvider();
    }

    if (null === this.jsonRpcClient) {
      this.jsonRpcClient = await this.client.getJsonRpcClient();
    }

    return this.client;
  }

  async listNFTs() {
    const viewResult = await this.client.getJsonRpcClient().invokeContract({
      contract: {
        index: BigInt(this.contractIndex),
        subindex: BigInt(this.contractSubindex),
      },
      method: this.contractName + ".view",
    });
    const returnValue = await deserializeReceiveReturnValue(
      toBuffer(viewResult.returnValue, "hex"),
      toBuffer(this.rawNFTModuleSchema, "base64"),
      this.contractName,
      "view",
      SchemaVersion.V2
    );

    return returnValue.all_tokens;
  }

  async getNextNFT() {
    return String(Object.keys(await this.listNFTs()).length + 1).padStart(
      8,
      "0"
    );
  }

  async mintNFT(address, token) {
    return await this.client.sendTransaction(
      address,
      AccountTransactionType.Update,
      {
        amount: new CcdAmount(BigInt(0)),
        contractAddress: {
          index: BigInt(this.contractIndex),
          subindex: BigInt(this.contractSubindex),
        },
        receiveName: this.contractName + ".mint",
        maxContractExecutionEnergy: BigInt(10000),
      },
      {
        owner: {
          Account: [address],
        },
        tokens: [token],
      },
      this.rawNFTModuleSchema
    );
  }

  async signMessage(message) {
    return toBuffer(
      JSON.stringify(await this.client.signMessage(this.account, message)),
      "utf-8"
    ).toString("base64");
  }
}
