const fs = require("fs");
const { resolve } = require("path");
const { getConfig } = require("../config/get");

// Load a plugin from the plugin directory
let loadPlugin = (path) => {
    let normalizedPluginPath = getConfig().pluginDir.replace(/^(\.\/|\/)?/, "");
    let normalizedPath = path.replace(/^(\.\/|\/)?/, "");
    let pluginDir = "./" + normalizedPluginPath;
    if (pluginDir === undefined) {
        throw new Error("Plugin directory not found in config file");
    }
    let pluginPath = resolve(`${pluginDir}/${normalizedPath}`);
    if (!fs.existsSync(pluginPath)) {
        throw new Error(`Plugin not found at ${pluginPath}`);
    }
    return require(pluginPath).plugin;
};

module.exports = { loadPlugin };
