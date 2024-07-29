const fs = require("fs");
const { resolve } = require("path");
const { getConfig } = require("../config/get");

let loadPlugin = (path) => {
    let pluginDir = getConfig().pluginDir;
    if (pluginDir === undefined) {
        throw new Error("Plugin directory not found in config file");
    }
    let pluginPath = resolve(`${pluginDir}/${path}`);
    if (!fs.existsSync(pluginPath)) {
        throw new Error(`Plugin not found at ${pluginPath}`);
    }
    return require(pluginPath).plugin;
};

module.exports = { loadPlugin };
