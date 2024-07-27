const inquirer = require("inquirer");
const fs = require("fs-extra");
const { prompts } = require("./cli/prompts");
const { createTSProject } = require("./create/typescript");
const { createJSProject } = require("./create/javascript");
const { createProject } = require("./create/index");

async function create(targetDir) {
    const prompt = inquirer.createPromptModule();
    const answers = await prompt(prompts);

    fs.ensureDirSync(targetDir);

    if (answers.typescript) {
        createTSProject(answers, targetDir);
    } else {
        createJSProject(answers, targetDir);
    }

    createProject(answers, targetDir);
}

module.exports = create;
