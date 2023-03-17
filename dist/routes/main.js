"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const delete_1 = require("../controllers/delete");
const get_1 = require("../controllers/get");
const post_1 = require("../controllers/post");
const update_1 = require("../controllers/update");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validations_1 = require("../validations/validations");
const Router = require("express").Router;
exports.router = new Router();
exports.router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json("main");
});
// Posts
exports.router.get("/posts", get_1.getControllers.getPosts);
exports.router.get("/post/:postId", get_1.getControllers.getPostById);
exports.router.post("/beforeAfter", authMiddleware_1.default, validations_1.postBeforeAfterValidator, post_1.postControllers.postBeforeAfter);
exports.router.post("/technologies", authMiddleware_1.default, validations_1.postTechnologiesValidator, post_1.postControllers.postTechnologies);
exports.router.post("/things", authMiddleware_1.default, validations_1.postThingsValidator, post_1.postControllers.postThings);
exports.router.post("/studyProject", authMiddleware_1.default, validations_1.postTechnologiesValidator, post_1.postControllers.postStudyProject);
exports.router.post("/scienceActivity", authMiddleware_1.default, validations_1.postScienceActivityValidator, post_1.postControllers.postScienceActivity);
exports.router.delete("/posts", authMiddleware_1.default, delete_1.deleteControllers.post);
exports.router.put("/post/:postId", authMiddleware_1.default, update_1.updateControllers.updatePost);
// Others
exports.router.get("/plants", get_1.getControllers.getPlants);
exports.router.get("/galery", get_1.getControllers.getPhotos);
exports.router.get("/refresh", get_1.getControllers.getRefresh);
exports.router.post("/login", validations_1.postAuthValidator, post_1.postControllers.postAuth);
exports.router.post("/plants", authMiddleware_1.default, validations_1.postPlantValidator, post_1.postControllers.postPlant);
exports.router.post("/galery", authMiddleware_1.default, validations_1.postPhotoValidator, post_1.postControllers.postPhoto);
exports.router.delete("/plants", authMiddleware_1.default, delete_1.deleteControllers.deletePlant);
exports.router.delete("/gallery", authMiddleware_1.default, delete_1.deleteControllers.photo);
exports.router.put("/plants", authMiddleware_1.default, update_1.updateControllers.updatePlant);
exports.default = exports.router;
