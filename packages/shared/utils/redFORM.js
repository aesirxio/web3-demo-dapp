import { redFORM as redFORMLib } from "@aesir-extensions/aesirx-js-library";

const redFORM = () => {
  const config = {
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT_URL,
  };

  return new redFORMLib(config);
};

export default redFORM;
