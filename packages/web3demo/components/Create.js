import {
  AccountTransactionType,
  CcdAmount,
  deserializeReceiveReturnValue,
  SchemaVersion,
} from "@concordium/web-sdk";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Buffer } from "buffer/";
import axios from "axios";

export default function CreateComponent() {
  const { accountAddress, provider } = useAuthentication();

  const toBuffer = (s, encoding) => {
    return Buffer.from(s, encoding);
  };

  const listNFTs = async () => {
    const viewResult = await provider.getJsonRpcClient().invokeContract({
      contract: {
        index: BigInt(process.env.NEXT_PUBLIC_SMARTCONTRACT_INDEX),
        subindex: BigInt(process.env.NEXT_PUBLIC_SMARTCONTRACT_SUBINDEX),
      },
      method: `${process.env.NEXT_PUBLIC_SMARTCONTRACT_NAME}.view`,
    });

    if (viewResult.returnValue == 0) {
      return 0;
    }

    console.log("viewResult", viewResult, process.env.NEXT_PUBLIC_SMARTCONTRACT_RAWSCHEMA);

    const returnValue = await deserializeReceiveReturnValue(
      toBuffer(viewResult.returnValue, "hex"),
      toBuffer(process.env.NEXT_PUBLIC_SMARTCONTRACT_RAWSCHEMA, "base64"),
      process.env.NEXT_PUBLIC_SMARTCONTRACT_NAME,
      "view",
      SchemaVersion.V2
    );

    return returnValue.all_tokens;
  };

  const handleAdd = async (event) => {
    const token = await getNextNFT();
    const trx = await mintNFT(accountAddress, token);

    await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/product/v1`,
      JSON.stringify({
        sku: "001",
        name: "lu",
        description: "yy",
        block: trx,
        token: token,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    event.preventDefault();
  };

  const getNextNFT = async () => {
    return String(Object.keys(await listNFTs()).length + 1).padStart(8, "0");
  };

  const mintNFT = async (address, token) => {
    return await provider.sendTransaction(
      address,
      AccountTransactionType.Update,
      {
        amount: new CcdAmount(BigInt(0)),
        contractAddress: {
          index: BigInt(process.env.NEXT_PUBLIC_SMARTCONTRACT_INDEX),
          subindex: BigInt(process.env.NEXT_PUBLIC_SMARTCONTRACT_SUBINDEX),
        },
        receiveName: `${process.env.NEXT_PUBLIC_SMARTCONTRACT_NAME}.mint`,
        maxContractExecutionEnergy: BigInt(10000),
      },
      {
        owner: {
          Account: [address],
        },
        tokens: [token],
      },
      process.env.NEXT_PUBLIC_SMARTCONTRACT_RAWSCHEMA
    );
  };

  // async productAdd(sku, name, description) {
  //   const token = await this.concordium.getNextNFT();
  //   const trx = await this.concordium.mintNFT(this.account, token);
  //   await this.axios.post(
  //     "http://localhost/product/v1",
  //     JSON.stringify({
  //       sku: sku,
  //       name: name,
  //       description: description,
  //       block: trx,
  //       token: token,
  //     }),
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   this.productList();
  // },
  return (
    <div>
      <h1>Create new Product</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSKU">
            <Form.Label>SKU</Form.Label>
            <Form.Control type="text" placeholder="SKU" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridToken">
            <Form.Label>Token</Form.Label>
            <Form.Control type="text" placeholder="Enter Token" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBlock">
            <Form.Label>Block</Form.Label>
            <Form.Control type="text" placeholder="Enter Block" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Description" />
          </Form.Group>
        </Row>
        <Button variant="primary" type="button" onClick={handleAdd}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
