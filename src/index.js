const { Exha } = require("./Classes/exha");
const { loadMiddleware } = require("./functions/loadMiddleware");
const { loadPlugin } = require("./functions/loadPlugin");

module.exports = { Exha, mwLoader: loadMiddleware, plLoader: loadPlugin };
