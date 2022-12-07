"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express = require('express');
const app = express();
app.use(express.json({ limit: '100mb' }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL || 'https://floroteka.netlify.app'
}));
app.use((0, cookie_parser_1.default)());
app.use('/', routes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
