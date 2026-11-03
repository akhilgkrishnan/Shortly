process.env.NODE_ENV = process.env.NODE_ENV || "test";
const { generateWebpackConfig } = require("shakapacker");
const customConfig = require("./custom");

module.exports = generateWebpackConfig(customConfig);
