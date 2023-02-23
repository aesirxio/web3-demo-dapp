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
import { useState } from "react";

export default function CreateComponent() {
  const { accountAddress, provider } = useAuthentication();
  const [values, setValues] = useState({});

  const handleAdd = async (event) => {
    const token = await getNextNFT();
    const trx = await mintNFT(accountAddress, token);

    const formData = new FormData();
    formData.append("block", trx);
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("sku", values.sku);
    formData.append("description", values.description);
    formData.append("main_image", values.image);

    await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/product/v1`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    event.preventDefault();
  };

  const handleChange = ({ target }) => {
    const value = target.type === "file" ? target.files[0] : target.value;
    setValues({ ...values, ...{ [target.name]: value } });
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

    const returnValue = await deserializeReceiveReturnValue(
      Buffer.from(viewResult.returnValue, "hex"),
      Buffer.from(process.env.NEXT_PUBLIC_SMARTCONTRACT_RAWSCHEMA, "base64"),
      process.env.NEXT_PUBLIC_SMARTCONTRACT_NAME,
      "view",
      SchemaVersion.V2
    );

    return returnValue.all_tokens;
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

  return (
    <div>
      <h1>Create new Product</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSKU">
            <Form.Label>SKU</Form.Label>
            <Form.Control name="sku" type="text" placeholder="SKU" onChange={handleChange} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              placeholder="Enter Description"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDesc">
            <Form.Label>Image</Form.Label>
            <Form.Control name="image" type="file" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Button variant="primary" type="button" onClick={handleAdd}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
