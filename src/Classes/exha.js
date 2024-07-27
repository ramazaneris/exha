const { loadConfig } = require("../functions/config/load");
const { init } = require("../functions/init");

class Exha {
    app = null;
    constructor(app) {
        this.app = app;
        this.config = loadConfig();
    }

    getExha() {
        init(this.app, this.config);
    }
}

module.exports = { Exha };
