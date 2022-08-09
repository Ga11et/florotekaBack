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
exports.getControllers = {
    getPlants: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, airtable_1.default)('plants').select({
            view: "Grid view"
        }).eachPage((records) => {
            const returnValue = records.map((el) => {
                const plantItem = {
                    name: el._rawJson.fields.Name,
                    latin: el._rawJson.fields.latin,
                    description: el._rawJson.fields.description,
                    date: el._rawJson.fields.date,
                    family: el._rawJson.fields.family,
                    from: el._rawJson.fields.from,
                    having: el._rawJson.fields.having,
                    livingPlace: el._rawJson.fields.livingPlace,
                    type: el._rawJson.fields.type,
                    img: el._rawJson.fields.image.map((el) => el.url),
                    id: el._rawJson.fields.id
                };
                return plantItem;
            });
            res.json(returnValue);
        }, function done(err) {
            if (err) {
                res.json(err);
                return;
            }
        });
    }),
    getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, airtable_1.default)('posts').select({
            view: "Grid view"
        }).eachPage((records) => {
            const returnValue = records.map(el => {
                const postItem = {
                    id: el.id,
                    heading: el.fields.Name,
                    describtion: el.fields.describtion,
                    text: el.fields.text,
                    date: el.fields.date,
                    after: el.fields.after ? el.fields.after[0].url : '',
                    before: el.fields.before ? el.fields.before[0].url : '',
                    images: el.fields.images ? el.fields.images.map(el => el.url) : [],
                    type: el.fields.type
                };
                return postItem;
            });
            res.json(returnValue);
        }, function done(err) {
            if (err) {
                res.json(err);
                return;
            }
        });
    }),
    getRefresh: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.cookies;
            const userData = tokenServises_1.tokenServises.checkRefreshToken(refreshToken);
            if (!userData.id)
                return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован userdata" }]);
            (0, airtable_1.default)('admins').select().eachPage((records) => {
                const existedAdminRecord = records.find(el => el.id === userData.id);
                if (!existedAdminRecord)
                    return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован" }]);
                const tokens = loginServises_1.loginServises.generateTokens({ id: userData.id, login: userData.login });
                res.status(200)
                    .cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true })
                    .json({ token: tokens.accessToken });
            });
        }
        catch (error) {
            return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован" }]);
        }
    })
};
