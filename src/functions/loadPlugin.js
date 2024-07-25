const fs = require("fs");
const { resolve } = require("path");
const { loadConfig } = require("./loadConfig");
let loadPlugin = (path) => {
    let pluginDir = loadConfig().pluginDir;
    let pluginPath = resolve(`${pluginDir}/${path}`);
    if (!fs.existsSync(pluginPath)) {
        throw new Error(`Pugin not found at ${pluginPath}`);
    }
    return require(pluginPath).plugin;
};

module.exports = { loadPlugin };
