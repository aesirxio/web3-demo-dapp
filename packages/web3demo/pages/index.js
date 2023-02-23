import ListComponent from "@components/List";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";
import axios from "axios";
import { useEffect, useState } from "react";
// import Concordium from "../web3/concordium";
import {
  deserializeReceiveReturnValue,
  toBuffer,
  SchemaVersion,
  AccountTransactionType,
  CcdAmount,
} from "@concordium/web-sdk";
export default function Home() {
  // const { accountAddress } = useAuthentication();
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const concordium = new Concordium();

  //       if (accountAddress) {
  //         const nonce = (
  //           await axios.get(
  //             `${process.env.NEXT_PUBLIC_ENDPOINT}/account/v1/${accountAddress}/nonce`
  //           )
  //         ).data.nonce;

  //         const signedNonce = await concordium.signMessage(String(nonce));
  //         const products = await axios.get(
  //           `${process.env.NEXT_PUBLIC_ENDPOINT}/account/v1/${accountAddress}?signature=${signedNonce}`
  //         );

  //         setProducts(products);
  //       }
  //     } catch (error) {}
  //   })();
  // }, [accountAddress]);

  // console.log(products);

  return <ListComponent />;
}
