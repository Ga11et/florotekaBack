"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const video_1 = require("../controllers/video");
const main_1 = require("./main");
main_1.router.get('/video', video_1.videoControllers.get);
