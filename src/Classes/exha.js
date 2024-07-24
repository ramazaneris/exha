const { loadConfig } = require("../functions/loadConfig");
const { init } = require("../functions/init");

class Exha {
    app = null;
    constructor(app) {
        this.app = app;
        this.config = loadConfig();
    }

    getExha() {
        init(this.app);
    }
}

module.exports = { Exha };
