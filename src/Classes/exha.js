const { getConfig } = require("../functions/config/get");
const { init } = require("../functions/init");

class Exha {
    app = null;
    constructor(app) {
        this.app = app;
        this.config = getConfig();
    }

    getExha() {
        init(this.app, this.config);
    }
}

module.exports = { Exha };
