"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenServises = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config({ path: process.cwd() + '/.env' });
exports.tokenServises = {
    checkAccessToken: (token) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN || 'secret');
    },
    checkRefreshToken: (token) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_TOKEN || 'secret');
    }
};
