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
exports.postPlant = void 0;
const express_validator_1 = require("express-validator");
const airtable_1 = __importDefault(require("../airtable"));
const cloudinary_1 = __importDefault(require("../cloudinary"));
const postPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
        res.status(422).json((0, express_validator_1.validationResult)(req).array());
        return;
    }
    try {
        const cloudinariResponse = yield cloudinary_1.default.uploader.upload(req.body.data.img[0]);
        const airtableData = {
            fields: {
                Name: req.body.data.name,
                latin: req.body.data.latin,
                description: req.body.data.description,
                date: req.body.data.date,
                family: req.body.data.family,
                from: req.body.data.from,
                having: req.body.data.having,
                type: req.body.data.type,
                livingPlace: req.body.data.livingPlace,
                id: req.body.data.id,
                image: [{ url: cloudinariResponse.url }]
            }
        };
        (0, airtable_1.default)('plants').create([airtableData]);
        res.json('ok');
    }
    catch (err) {
        console.log(err);
    }
});
exports.postPlant = postPlant;
