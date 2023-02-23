import ListComponent from "@components/List";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";
import axios from "axios";
import { useEffect, useState } from "react";

import { Buffer } from "buffer";

export default function Home() {
  const { accountAddress, provider } = useAuthentication();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (accountAddress) {
          const nonce = (
            await axios.get(
              `${process.env.NEXT_PUBLIC_ENDPOINT}/account/v1/${accountAddress}/nonce`
            )
          ).data.nonce;

          const signedNonce = Buffer.from(
            JSON.stringify(await provider.signMessage(accountAddress, String(nonce))),
            "utf-8"
          ).toString("base64");

          const products = await axios.get(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/product/v1/${accountAddress}?signature=${signedNonce}`
          );

          setProducts(products);
        }
      } catch (error) {}
    })();
  }, [accountAddress, provider]);

  return <ListComponent products={products} />;
}
