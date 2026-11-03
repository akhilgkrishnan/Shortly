const path = require("path");

module.exports = {
  resolve: {
    alias: {
      apis: path.resolve(__dirname, "../../app/javascript/src/apis"),
      common: path.resolve(__dirname, "../../app/javascript/src/common"),
      components: path.resolve(__dirname, "../../app/javascript/src/components"),
    },
  },
};