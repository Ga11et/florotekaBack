"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: process.cwd() + '/.env' });
const base = require('airtable').base('apphq3bB8tbOJbcaa');
exports.default = base;
