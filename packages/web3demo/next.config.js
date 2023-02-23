const nextConfigDefault = require("../shared/utils/NextConfig");

const packageJSON = require("./package.json");
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
  it.includes("@concordium/")
);

const withTM = require("next-transpile-modules")([
  "@concordium/rust-bindings",
  "@concordium/common-sdk",
  "@concordium/browser-wallet-api-helpers",
  "@concordium/web-sdk",
]);

const nextConfig = {
  ...nextConfigDefault,
};

module.exports = withTM(nextConfig);
