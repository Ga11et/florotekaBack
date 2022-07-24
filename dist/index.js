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
const cloudinary_1 = __importDefault(require("./cloudinary"));
const cors_1 = __importDefault(require("cors"));
const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json('main');
});
app.get('/plants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json('plants');
}));
app.post('/plants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const cloudinariResponse = yield cloudinary_1.default.uploader.upload(req.body.data);
        console.log(cloudinariResponse);
        res.json(cloudinariResponse.url);
    }
    catch (err) {
        console.log(err);
    }
}));
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
