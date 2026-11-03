const { generateWebpackConfig } = require("shakapacker");
const customConfig = require("./custom");

module.exports = generateWebpackConfig(customConfig);
