import { AcyMailing as AcyMailingLib } from "@aesir-extensions/aesirx-js-library";

const AcyMailing = () => {
  const config = {
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT_URL,
  };

  return new AcyMailingLib(config);
};

export default AcyMailing;
