const fs = require("fs");
const { resolve } = require("path");
const { getConfig } = require("../config/get");
let loadMiddleware = (path) => {
    let normalizedMiddlewarePath = getConfig().middlewareDir.replace(
        /^(\.\/|\/)?/,
        ""
    );

    let normalizedPath = path.replace(/^(\.\/|\/)?/, "");

    let middlewareDir = "./" + normalizedMiddlewarePath;
    if (middlewareDir === undefined) {
        throw new Error("Middleware directory not found in config file");
    }
    let middlewarePath = resolve(`${middlewareDir}/${normalizedPath}`);
    if (!fs.existsSync(middlewarePath)) {
        throw new Error(`Middleware not found at ${middlewarePath}`);
    }
    return require(middlewarePath).middleware;
};

module.exports = { loadMiddleware };
