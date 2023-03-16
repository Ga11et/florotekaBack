"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServises = void 0;
const mainServises_1 = require("./mainServises");
exports.postServises = {
    postsMapping(posts) {
        return posts.map((post) => ({
            id: post.id,
            heading: post.fields.Name,
            description: post.fields.description,
            date: post.fields.date,
            text: post.fields.text,
            type: post.fields.type,
            after: post.fields.after
                ? mainServises_1.mainServises.imageMapping(post.fields.after)[0]
                : { small: "", full: "", id: "" },
            before: post.fields.before
                ? mainServises_1.mainServises.imageMapping(post.fields.before)[0]
                : { small: "", full: "", id: "" },
            images: post.fields.images
                ? mainServises_1.mainServises.imageMapping(post.fields.images)
                : [],
        }));
    },
    postMapping(post) {
        return {
            id: post.id,
            heading: post.fields.Name,
            description: post.fields.description,
            date: post.fields.date,
            text: post.fields.text,
            type: post.fields.type,
            after: post.fields.after
                ? mainServises_1.mainServises.imageMapping(post.fields.after)[0]
                : { small: "", full: "", id: "" },
            before: post.fields.before
                ? mainServises_1.mainServises.imageMapping(post.fields.before)[0]
                : { small: "", full: "", id: "" },
            images: post.fields.images
                ? mainServises_1.mainServises.imageMapping(post.fields.images)
                : [],
        };
    },
};
