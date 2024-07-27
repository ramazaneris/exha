#!/usr/bin/env node

const path = require("path");
const create = require("../lib/create");

const args = process.argv.slice(2);
const targetDir = args[0] || ".";

create(path.resolve(process.cwd(), targetDir));
