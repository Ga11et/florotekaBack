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
exports.getControllers = void 0;
const airtable_1 = __importDefault(require("../airtable"));
const tokenServises_1 = require("../servises/tokenServises");
const loginServises_1 = require("../servises/loginServises");
const mainServises_1 = require("../servises/mainServises");
exports.getControllers = {
    getPlants: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const records = yield (0, airtable_1.default)('plants').select().firstPage();
        const returnValue = records.map(el => {
            const plantItem = {
                id: el.id,
                name: el.fields.Name,
                latin: el.fields.latin,
                description: el.fields.description,
                date: el.fields.date,
                family: el.fields.family,
                from: el.fields.from,
                having: el.fields.having,
                livingPlace: el.fields.livingPlace,
                type: el.fields.type,
                img: mainServises_1.mainServises.imageMapping(el.fields.image)
            };
            return plantItem;
        });
        res.json(returnValue);
    }),
    getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const records = yield (0, airtable_1.default)('posts').select().firstPage();
        const returnValue = records.map(el => {
            const postItem = {
                id: el.id,
                heading: el.fields.Name,
                description: el.fields.description,
                text: el.fields.text,
                date: el.fields.date,
                after: el.fields.after ? mainServises_1.mainServises.imageMapping(el.fields.after)[0] : { small: '', full: '' },
                before: el.fields.before ? mainServises_1.mainServises.imageMapping(el.fields.before)[0] : { small: '', full: '' },
                images: el.fields.images ? mainServises_1.mainServises.imageMapping(el.fields.images) : [],
                type: el.fields.type
            };
            return postItem;
        });
        res.json(returnValue);
    }),
    getPhotos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const records = yield (0, airtable_1.default)('galery').select().firstPage();
        const returnValue = records.map(record => ({
            id: record.id,
            image: record.fields.photos[0].url
        }));
        res.status(200).json(returnValue);
    }),
    getRefresh: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.cookies;
            const userData = tokenServises_1.tokenServises.checkRefreshToken(refreshToken);
            if (!userData.id)
                return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован (refresh token is unavailable))" }]);
            const records = yield (0, airtable_1.default)('admins').select().firstPage();
            const existedAdminRecord = records.find(el => el.id === userData.id);
            if (!existedAdminRecord)
                return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован (admin is unavailable)" }]);
            const tokens = yield loginServises_1.loginServises.generateTokens({ id: userData.id, login: userData.login });
            res.status(200)
                .cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true })
                .json({ token: tokens.accessToken });
        }
        catch (error) {
            return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован", error: error }]);
        }
    })
};
