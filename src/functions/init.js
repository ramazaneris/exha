const { loadRoutes } = require("./loads/routes");
const express = require("express");
const clcn = require("clcn");

let init = (app, config) => {
    if (config?.parseForm) {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        console.log(clcn.txtYellow("\n✓ Form parsing enabled"));
    }
    if (config?.staticDir) {
        if (typeof config.staticDir === "object") {
            config.staticDir.map((dir) => {
                app.use(dir.route, express.static(dir.folder));
            });
            console.log(
                clcn.txtYellow(`✓ Static files served from ${config.folder}`)
            );
        } else {
            let normalizedStaticDir = config.staticDir.replace(
                /^(\.\/|\/)?/,
                ""
            );

            app.use(
                "/" + normalizedStaticDir,
                express.static(normalizedStaticDir)
            );
            console.log(
                clcn.txtYellow(
                    `✓ Static files served from ${normalizedStaticDir}`
                )
            );
        }
    }

    if (config?.imageUploader) {
        console.log(clcn.txtYellow("✓ Image uploader enabled"));
    }

    loadRoutes(app, config);
    app.listen(config.port || 3000, () => {
        console.log(
            clcn.txtMagenta(
                `✓ Exha app listening at http://localhost:${
                    config.port || 3000
                }\n`
            )
        );
        console.log(clcn.txtBlack("Ctrl + C to stop the server"));
    });
};

module.exports = { init };
