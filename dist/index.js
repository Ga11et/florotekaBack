"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const get_1 = require("./routes/get");
const post_1 = require("./routes/post");
const validations_1 = require("./validations/validations");
const middleware_1 = __importDefault(require("./middleware/middleware"));
const express = require('express');
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use((0, cors_1.default)());
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json('main');
});
app.get('/plants', get_1.getPlants);
app.get('/posts', get_1.getPosts);
app.post('/login', post_1.postAuth);
app.post('/plants', middleware_1.default, validations_1.postPlantValidator, post_1.postPlant);
app.post('/beforeAfter', middleware_1.default, validations_1.postBeforeAfterValidator, post_1.postBeforeAfter);
app.post('/technologies', middleware_1.default, validations_1.postTechnologiesValidator, post_1.postTechnologies);
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
