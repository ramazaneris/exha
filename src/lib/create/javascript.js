const path = require("path");
const fs = require("fs-extra");

let createJSProject = (answers, targetDir) => {
    const templateJSPath = path.join(__dirname, "../templates/js_templates");
    const routeDir = path.join(targetDir, "routes");
    fs.ensureDirSync(routeDir);
    fs.copyFileSync(
        templateJSPath + "/routes/index.js",
        path.join(targetDir, answers.routeDir, "index.js")
    );

    fs.copyFileSync(
        templateJSPath + "/index.js",
        path.join(targetDir, "index.js")
    );

    let config = {
        routeDir: "./" + answers.routeDir,
        staticDir: "./" + answers.staticDir,
    };

    if (answers.formParser) {
        config.formParser = true;
    }

    if (answers.imageUploader) {
        config.imageUploader = true;
    }

    fs.writeFileSync(
        path.join(targetDir, "exha.config.js"),
        `exports.default = ${JSON.stringify(config, null, 4)}`
    );
};

module.exports = {
    createJSProject,
};
