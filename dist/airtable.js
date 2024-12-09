"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: process.cwd() + '/.env' });
const Airtable = require('airtable');
Airtable.configure({ apiKey: process.env.AIRTABLE_NEW_TOKEN });
const base = Airtable.base('apphq3bB8tbOJbcaa');
exports.default = base;
