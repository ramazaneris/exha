const express = require("express");
const { Exha } = require("exha");

const app = express();
let exha = new Exha(app);

exha.getExha();
