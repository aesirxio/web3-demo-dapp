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
    domains: ["localhost"],
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
