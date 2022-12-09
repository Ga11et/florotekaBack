"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = require("./../controllers/update");
const validations_1 = require("./../validations/validations");
const get_1 = require("./../controllers/get");
const post_1 = require("../controllers/post");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validations_2 = require("../validations/validations");
const delete_1 = require("../controllers/delete");
const main_1 = require("./main");
main_1.router.get('/plants', get_1.getControllers.getPlants);
main_1.router.get('/posts', get_1.getControllers.getPosts);
main_1.router.get('/galery', get_1.getControllers.getPhotos);
main_1.router.get('/refresh', get_1.getControllers.getRefresh);
main_1.router.post('/login', validations_1.postAuthValidator, post_1.postControllers.postAuth);
main_1.router.post('/plants', authMiddleware_1.default, validations_2.postPlantValidator, post_1.postControllers.postPlant);
main_1.router.post('/beforeAfter', authMiddleware_1.default, validations_2.postBeforeAfterValidator, post_1.postControllers.postBeforeAfter);
main_1.router.post('/technologies', authMiddleware_1.default, validations_2.postTechnologiesValidator, post_1.postControllers.postTechnologies);
main_1.router.post('/things', authMiddleware_1.default, validations_2.postThingsValidator, post_1.postControllers.postThings);
main_1.router.post('/galery', authMiddleware_1.default, validations_1.postPhotoValidator, post_1.postControllers.postPhoto);
main_1.router.post('/studyProject', authMiddleware_1.default, validations_2.postTechnologiesValidator, post_1.postControllers.postStudyProject);
main_1.router.post('/scienceActivity', authMiddleware_1.default, validations_1.postScienceActivityValidator, post_1.postControllers.postScienceActivity);
main_1.router.delete('/plants', authMiddleware_1.default, delete_1.deleteControllers.deletePlant);
main_1.router.delete('/posts', authMiddleware_1.default, delete_1.deleteControllers.post);
main_1.router.delete('/gallery', authMiddleware_1.default, delete_1.deleteControllers.photo);
main_1.router.put('/plants', authMiddleware_1.default, update_1.updateControllers.updatePlant);
exports.default = main_1.router;
