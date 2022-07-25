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
exports.getPosts = exports.getPlants = void 0;
const airtable_1 = __importDefault(require("../airtable"));
const getPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
});
exports.getPlants = getPlants;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    (0, airtable_1.default)('posts').select({
        view: "Grid view"
    }).eachPage((records) => {
        const returnValue = records.map((el) => {
            const postItem = {
                heading: el._rawJson.fields.heading,
                text: el._rawJson.fields.text,
                date: el._rawJson.fields.date,
                after: el._rawJson.fields.after ? el._rawJson.fields.after[0].url : '',
                before: el._rawJson.fields.before ? el._rawJson.fields.before[0].url : '',
                images: el._rawJson.fields.images ? el._rawJson.fields.images.map(el => el.url) : [],
                type: el._rawJson.fields.type,
                id: el._rawJson.fields.id
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
});
exports.getPosts = getPosts;
