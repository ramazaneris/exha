const { loadRoutes } = require("./loadRoutes");
const { loadConfig } = require("./loadConfig");

let init = (app) => {
    let config = loadConfig();
    loadRoutes(app, config);
    app.listen(config.port, () => {
        console.log(`Example app listening at http://localhost:${config.port}`);
    });
};

module.exports = { init };
