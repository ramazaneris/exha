const path = require("path");
const { execSync } = require("child_process");
let fs = require("fs-extra");

let createProject = (answers, targetDir) => {
    if (answers.formParser) {
        console.log("Forms parsing...");
    }

    if (answers.imageUploader) {
        console.log(answers.imageUploader);
        console.log("Images uploadings...");
    }

    if (answers.staticDir) {
        const staticDir = path.join(targetDir, answers.staticDir);
        fs.ensureDirSync(staticDir);
        fs.writeFileSync(
            path.join(staticDir, "index.html"),
            "<h1>Hello World</h1>"
        );
        console.log("Assets folder created : ", staticDir);
    }

    console.log(answers);
    try {
        execSync("pnpm install express", { stdio: "ignore" });
        if (answers.typescript) {
            execSync("pnpm install @types/express", { stdio: "ignore" });
        }
        console.log("Project created:", targetDir);
    } catch (error) {
        console.error(`Command failed: "npm install express"`);
        console.error(error.stderr);
        throw error;
    }
};

module.exports = { createProject };
