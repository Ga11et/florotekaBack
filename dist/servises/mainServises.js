"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainServises = void 0;
exports.mainServises = {
    imageMapping(images) {
        return images.map(image => ({ full: image.thumbnails.full.url, small: image.thumbnails.large.url }));
    }
};