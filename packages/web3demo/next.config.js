const nextConfigDefault = require("../shared/utils/NextConfig");

const packageJSON = require("./package.json");
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
  it.includes("@concordium/")
);

console.log(transpiledPackages);

const withTM = require("next-transpile-modules")(transpiledPackages);

const nextConfig = {
  ...nextConfigDefault,
};

module.exports = withTM(nextConfig);
