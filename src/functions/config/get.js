const fs = require("fs");
const { resolve } = require("path");

let getConfig = () => {
    let config = fs.existsSync(resolve("./exha.config.ts"))
        ? require(resolve("./exha.config.ts")).default
        : fs.existsSync(resolve("./exha.config.js"))
        ? require(resolve("./exha.config.js")).default
        : {
              routeDir: "./routes",
              port: 3001,
          };

    return config;
};

module.exports = { getConfig };
