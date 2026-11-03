process.env.NODE_ENV = process.env.NODE_ENV || "development";
const { generateWebpackConfig } = require("shakapacker");
const customConfig = require("./custom");

module.exports = generateWebpackConfig(customConfig);
