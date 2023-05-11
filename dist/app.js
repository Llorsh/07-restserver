"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({
    path: "".concat(process.env.ENV_FILE).trim()
});
var server_1 = __importDefault(require("./models/server"));
var server = new server_1.default();
server.start();
