const { loadRoutes } = require("./loadRoutes");
const { loadConfig } = require("./loadConfig");
const express = require("express");

let init = (app) => {
    let config = loadConfig();
    loadRoutes(app, config);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(config.staticDir, express.static(config.staticDir));

    app.listen(config.port, () => {
        console.log(`Example app listening at http://localhost:${config.port}`);
    });
};

module.exports = { init };
