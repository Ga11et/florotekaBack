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
exports.postControllers = void 0;
const express_validator_1 = require("express-validator");
const airtable_1 = __importDefault(require("../airtable"));
const cloudinary_1 = __importDefault(require("../cloudinary"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginServises_1 = require("../servises/loginServises");
exports.postControllers = {
    postPlant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    postAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { login, pass } = req.body.data;
            (0, airtable_1.default)('admins').select().eachPage((records) => {
                const usersData = loginServises_1.loginServises.getData(records);
                const user = usersData.find(el => el.login === login);
                if (!user)
                    return res.status(400).json({ error: 'Неверно введенные данные' });
                const isPassValid = bcrypt_1.default.compareSync(pass, user.pass);
                if (!isPassValid)
                    return res.status(400).json({ error: 'Неверно введенные данные' });
                const tokens = loginServises_1.loginServises.generateTokens({ id: user.id, login: user.login });
                res.status(200)
                    .cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none' })
                    .json({ token: tokens.accessToken });
            });
        }
        catch (error) {
            return res.status(400).json([{ param: 'data.origin', msg: error }]);
        }
    }),
    postBeforeAfter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { heading, description, before, after } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(404).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const beforeUrl = yield cloudinary_1.default.uploader.upload(before)
                .then(resp => resp.url);
            const afterUrl = yield cloudinary_1.default.uploader.upload(after)
                .then(resp => resp.url);
            const airtableData = {
                fields: {
                    Name: heading,
                    describtion: description,
                    text: description,
                    date: (new Date).getTime(),
                    after: [{ url: afterUrl }],
                    before: [{ url: beforeUrl }],
                    images: [],
                    type: 'beforeAfter'
                }
            };
            (0, airtable_1.default)('posts').create([airtableData]);
        }
        catch (error) {
            res.status(500).json({ msg: 'server mistake', error: error });
        }
        res.json('ok');
    }),
    postTechnologies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { heading, description, stepPhotos, stepTexts } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(404).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const stepPhotoUrls = yield stepPhotos.map((photo) => __awaiter(void 0, void 0, void 0, function* () {
                const url = yield cloudinary_1.default.uploader.upload(photo).then(photo => photo.url);
                return url;
            }));
            Promise.all(stepPhotoUrls).then(values => {
                const airtableData = {
                    fields: {
                        Name: heading,
                        describtion: description,
                        text: stepTexts.join('\n\n'),
                        date: (new Date).getTime(),
                        after: [],
                        before: [],
                        images: values.map(image => ({ url: image })),
                        type: 'technologies'
                    }
                };
                (0, airtable_1.default)('posts').create([airtableData]);
                res.json('ok');
            });
        }
        catch (error) {
            res.status(500).json({ msg: 'server mistake', error: error });
        }
    }),
    postThings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { heading, describtion, photos } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(404).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const photoUrls = yield photos.map((photo) => {
                return cloudinary_1.default.uploader.upload(photo);
            });
            Promise.all(photoUrls).then(urls => {
                const airtableData = {
                    fields: {
                        Name: heading,
                        describtion: describtion,
                        text: '',
                        date: (new Date).getTime(),
                        after: [],
                        before: [],
                        images: urls.map(image => ({ url: image.url })),
                        type: 'things'
                    }
                };
                (0, airtable_1.default)('posts').create([airtableData]);
                res.json('ok');
            });
        }
        catch (error) {
            return res.status(500).json({ msg: 'server mistake', error: error });
        }
    })
};
