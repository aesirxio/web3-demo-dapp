import { Aesir as AesirLib } from "@aesir-extensions/aesirx-js-library";

const Aesir = () => {
  const config = {
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT_URL,
  };

  return new AesirLib(config);
};

export default Aesir;
