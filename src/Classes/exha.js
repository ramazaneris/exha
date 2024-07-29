const { getConfig } = require("../functions/config/get");
const { init } = require("../functions/init");
const express = require("express");

class Exha {
    app = null;
    constructor(app) {
        if (!app) {
            this.app = express();
        } else {
            this.app = app;
        }
        this.config = getConfig();
    }

    init() {
        init(this.app, this.config);
    }
}

module.exports = { Exha };
