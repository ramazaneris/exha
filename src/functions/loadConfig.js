const fs = require("fs");
const { resolve } = require("path");

let loadConfig = () => {
    let configPath = "./exha.config.js";

    if (!fs.existsSync(configPath)) {
        if (!fs.existsSync("./exha.config.ts")) {
            throw new Error(
                "Config file not found create this file in root directory as exha.config.js or exha.config.ts"
            );
        }
        configPath = "./exha.config.ts";
    }

    let config;

    if (configPath.split(".").pop() === "ts") {
        config = require(resolve(configPath)).config;
    } else if (configPath.split(".").pop() === "js") {
        config = require(resolve(configPath));
    } else {
        throw new Error(
            "Config file not foun create this file in root directory as exha.config.js or exha.config.ts"
        );
    }

    if (!config.port) {
        config.port = 3001;
    }

    if (!config.middlewareDir) {
        config.middlewareDir = "./middlewares";
    }
    if (!fs.existsSync(config.middlewareDir)) {
        fs.mkdirSync(config.middlewareDir, { recursive: true });
    }

    if (!config.routeDir) {
        config.routeDir = "./routes";
        if (!fs.existsSync(config.routeDir)) {
            fs.mkdirSync(config.routeDir, { recursive: true });
        }
        if (configPath.split(".").pop() === "ts") {
            fs.writeFileSync(
                `${config.routeDir}/index.ts`,
                `export const event = (req, res) => {\n\tres.send("Hello World");\n}`
            );
        } else {
            fs.writeFileSync(
                `${config.routeDir}/index.js`,
                `module.exports = {
    event: (req, res) => {
        res.send("Hello World");
    },
}`
            );
        }
    }

    if (!config.staticDir) {
        config.staticDir = "./public";
        if (!fs.existsSync(config.staticDir)) {
            fs.mkdirSync(config.staticDir, { recursive: true });
            fs.writeFileSync("./public/index.html", "<h1>Hello World</h1>");
        }
    }

    if (configPath.split(".").pop() === "ts") {
        fs.writeFileSync(
            configPath,
            `export const config = ${JSON.stringify(config, null, 4)}`
        );
    } else {
        fs.writeFileSync(
            configPath,
            `module.exports = ${JSON.stringify(config, null, 4)}`
        );
    }

    return config;
};

module.exports = {
    loadConfig,
};
