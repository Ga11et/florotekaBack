"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("./../controllers/get");
const post_1 = require("../controllers/post");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validations_1 = require("../validations/validations");
const Router = require('express').Router;
const router = new Router();
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json('main');
});
router.get('/plants', get_1.getControllers.getPlants);
router.get('/posts', get_1.getControllers.getPosts);
router.get('/refresh', get_1.getControllers.getRefresh);
router.post('/login', post_1.postControllers.postAuth);
router.post('/plants', authMiddleware_1.default, validations_1.postPlantValidator, post_1.postControllers.postPlant);
router.post('/beforeAfter', authMiddleware_1.default, validations_1.postBeforeAfterValidator, post_1.postControllers.postBeforeAfter);
router.post('/technologies', authMiddleware_1.default, validations_1.postTechnologiesValidator, post_1.postControllers.postTechnologies);
router.post('/things', authMiddleware_1.default, validations_1.postThingsValidator, post_1.postControllers.postThings);
exports.default = router;