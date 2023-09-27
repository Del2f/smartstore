const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@img": path.resolve(__dirname, "src", "img"),
    "@scss": path.resolve(__dirname, "src", "scss"),
    "@styles": path.resolve(__dirname, "src", "styles"),
  })
);
