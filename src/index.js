const { Exha } = require("./Classes/exha");
const { loadMiddleware } = require("./functions/loads/middleware");
const { loadPlugin } = require("./functions/loads/plugin");

module.exports = { Exha, mwLoader: loadMiddleware, plLoader: loadPlugin };
