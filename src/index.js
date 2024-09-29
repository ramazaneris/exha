const { Exha } = require("./Classes/exha");
const { loadMiddleware } = require("./functions/loads/middleware");
const { loadPlugin } = require("./functions/loads/plugin");
const { uploader } = require("./functions/loads/uploader");

module.exports = {
    Exha,
    mwLoader: loadMiddleware,
    plLoader: loadPlugin,
    uploader,
};
