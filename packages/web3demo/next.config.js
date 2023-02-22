const nextConfigDefault = require("../shared/utils/NextConfig");
const withTM = require("next-transpile-modules")(["@concordium/browser-wallet-api-helpers"]);

const nextConfig = {
  ...nextConfigDefault,
};

module.exports = withTM(nextConfig);
