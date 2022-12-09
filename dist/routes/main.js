"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require('express').Router;
exports.router = new Router();
exports.router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json('main');
});
