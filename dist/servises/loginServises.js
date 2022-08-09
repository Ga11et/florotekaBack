"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginServises = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const airtable_1 = __importDefault(require("../airtable"));
require('dotenv').config({ path: process.cwd() + '/.env' });
exports.loginServises = {
    getData: (records) => {
        const returnValue = records.map(el => {
            const adminItem = {
                id: el.id,
                login: el.fields.login,
                pass: el.fields.password
            };
            return adminItem;
        });
        return returnValue;
    },
    generateTokens: (data) => {
        const accessToken = jsonwebtoken_1.default.sign(data, process.env.JWT_TOKEN || 'secret', { expiresIn: '2h' });
        const refreshToken = jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN || 'secret', { expiresIn: '30d' });
        (0, airtable_1.default)('tokens').select().eachPage((records) => __awaiter(void 0, void 0, void 0, function* () {
            const existedRecord = records.find(el => data.id === el.fields.id);
            if (existedRecord !== undefined)
                yield (0, airtable_1.default)('tokens').destroy([existedRecord.id]);
            const airtableData = {
                fields: {
                    id: data.id,
                    token: refreshToken
                }
            };
            (0, airtable_1.default)('tokens').create([airtableData]);
        }));
        return {
            accessToken,
            refreshToken
        };
    }
};
