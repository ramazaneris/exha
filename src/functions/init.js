const { loadRoutes } = require("./loads/routes");
const express = require("express");
const clcn = require("clcn");

let init = (app, config) => {
    if (config.parseForm) {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
    if (config.staticDir) {
        app.use(config.staticDir, express.static(config.staticDir));
    }

    loadRoutes(app, config);
    app.listen(config.port || 3000, () => {
        console.log(
            clcn.txtMagenta(
                `Exha app listening at http://localhost:${config.port || 3000}`
            )
        );
    });
};

module.exports = { init };
