import express from "express";
import { Exha } from "exha";

const app = express();
const exha = new Exha(app);

exha.getExha();
