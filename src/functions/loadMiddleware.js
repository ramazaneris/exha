const fs = require("fs");
const { resolve } = require("path");
const { loadConfig } = require("./loadConfig");
let loadMiddleware = (path) => {
    let middlewareDir = loadConfig().middlewareDir;
    let middlewarePath = resolve(`${middlewareDir}/${path}`);
    if (!fs.existsSync(middlewarePath)) {
        throw new Error(`Middleware not found at ${middlewarePath}`);
    }
    return require(middlewarePath).middleware;
};

module.exports = { loadMiddleware };
