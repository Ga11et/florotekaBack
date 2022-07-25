"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: process.cwd() + '/.env' });
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base(process.env.AIRTABLE_BASE_ID);
exports.default = base;
