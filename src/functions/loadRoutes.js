const fs = require("fs");
const path = require("path");
const clcn = require("clcn");

let loadRoutes = (app, config) => {
    fs.readdirSync(path.resolve(config.routeDir)).map((file) => {
        let fullRoute = config.routeDir + "/" + file;
        const fullPath = path.resolve(fullRoute);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            loadRoutes(app, { routeDir: fullRoute });
        } else {
            const route = require(fullPath);
            route.middlewares = route.middlewares || [];

            let frSplit = fullRoute.split("/").slice(2, -1);
            let endpoint = (
                (frSplit.length === 0 ? "/" : "/" + frSplit.join("/") + "/") +
                (file.split(".")[0] === "index" ? "" : file.split(".")[0])
            ).replace(/\[([^\]]+)\]/g, ":$1");

            let [routeFile, method] = file.split(".");
            switch (method) {
                case "post":
                    app.post(endpoint, ...route?.middlewares, route.event);
                    console.log("POST Route " + endpoint + " loaded");
                    break;
                case "put":
                    app.put(endpoint, ...route?.middlewares, route.event);
                    console.log("PUT Route " + endpoint + " loaded");
                    break;
                case "delete":
                    app.delete(endpoint, ...route?.middlewares, route.event);
                    console.log("DELETE Route " + endpoint + " loaded");
                    break;
                case "patch":
                    app.patch(endpoint, ...route?.middlewares, route.event);
                    console.log("PATCH Route " + endpoint + " loaded");
                    break;
                default:
                    app.get(endpoint, ...route?.middlewares, route.event);
                    console.log("GET Route " + endpoint + " loaded");
                    method = "get";
                    break;
            }
        }
    });
};

module.exports = {
    loadRoutes,
};
