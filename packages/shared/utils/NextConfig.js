const path = require("path");
const withTM = require("next-transpile-modules")(["@concordium/browser-wallet-api-helpers"]);

const isProd = process.env.NODE_ENV === "production";

const nextConfigDefault = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    minimumCacheTTL: 60,
    domains: [
      "backend.dma.aesirx.io",
      "backend.dev.dma.aesirx.io",
      "api.aesirx.io",
      "dev.api.r.redweb.digital",
      "dev01.aesirx.io",
    ],
  },
  experimental: {
    externalDir: true,
    outputFileTracingRoot: path.join(__dirname, "../../../"),
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfigDefault;
