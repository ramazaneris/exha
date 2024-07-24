const { Exha } = require("./Classes/exha");
const { loadMiddleware } = require("./functions/loadMiddleware");

module.exports = { Exha, mwLoader: loadMiddleware };
