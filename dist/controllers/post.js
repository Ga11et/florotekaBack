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
            const { name, latin, description, date, family, from, having, type, livingPlace, img } = req.body.data;
            const promises = img.map((el) => __awaiter(void 0, void 0, void 0, function* () {
                return yield cloudinary_1.default.uploader.upload(el, { folder: 'floroteka' });
            }));
            const cloudinaryResponse = yield Promise.all(promises);
            const airtableData = {
                fields: {
                    Name: name,
                    latin: latin,
                    description: description,
                    date: date,
                    family: family,
                    from: from,
                    having: having,
                    type: type,
                    livingPlace: livingPlace,
                    image: cloudinaryResponse.map(resp => ({ url: resp.url }))
                }
            };
            yield (0, airtable_1.default)('plants').create([airtableData]);
            res.json('ok');
        }
        catch (err) {
            console.log(err);
        }
    }),
    postAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(422).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const { login, pass } = req.body.data;
            const records = yield (0, airtable_1.default)('admins').select().firstPage();
            const usersData = loginServises_1.loginServises.getData(records);
            const user = usersData.find(el => el.login === login);
            if (!user)
                return res.status(400).json({ error: 'Неверно введенные данные' });
            const isPassValid = bcrypt_1.default.compareSync(pass, user.pass);
            if (!isPassValid)
                return res.status(400).json({ error: 'Неверно введенные данные' });
            const tokens = yield loginServises_1.loginServises.generateTokens({ id: user.id, login: user.login });
            res.status(200)
                .cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', httpOnly: true, secure: true })
                .json({ token: tokens.accessToken });
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
            const beforeUrl = yield cloudinary_1.default.uploader.upload(before, { folder: 'floroteka' })
                .then(resp => resp.url);
            const afterUrl = yield cloudinary_1.default.uploader.upload(after, { folder: 'floroteka' })
                .then(resp => resp.url);
            const airtableData = {
                fields: {
                    Name: heading,
                    description: description,
                    text: description,
                    date: (new Date).getTime(),
                    after: [{ url: afterUrl }],
                    before: [{ url: beforeUrl }],
                    images: [],
                    type: 'beforeAfter'
                }
            };
            yield (0, airtable_1.default)('posts').create([airtableData]);
            res.json('ok');
        }
        catch (error) {
            res.status(500).json({ msg: 'server mistake', error: error });
        }
    }),
    postTechnologies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { heading, description, stepPhotos, stepTexts } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(404).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const stepPhotoUrls = yield stepPhotos.map((photo) => __awaiter(void 0, void 0, void 0, function* () {
                const url = yield cloudinary_1.default.uploader.upload(photo, { folder: 'floroteka' }).then(photo => photo.url);
                return url;
            }));
            const values = yield Promise.all(stepPhotoUrls);
            const airtableData = {
                fields: {
                    Name: heading,
                    description: description,
                    text: stepTexts.join('\n\n'),
                    date: (new Date).getTime(),
                    after: [],
                    before: [],
                    images: values.map(image => ({ url: image })),
                    type: 'technologies'
                }
            };
            yield (0, airtable_1.default)('posts').create([airtableData]);
            res.json('ok');
        }
        catch (error) {
            res.status(500).json({ msg: 'server mistake', error: error });
        }
    }),
    postThings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { heading, description, photos } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(404).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const photoUrls = yield photos.map((photo) => {
                return cloudinary_1.default.uploader.upload(photo, { folder: 'floroteka' });
            });
            const urls = yield Promise.all(photoUrls);
            const airtableData = {
                fields: {
                    Name: heading,
                    description: description,
                    text: '',
                    date: (new Date).getTime(),
                    after: [],
                    before: [],
                    images: urls.map(image => ({ url: image.url })),
                    type: 'things'
                }
            };
            yield (0, airtable_1.default)('posts').create([airtableData]);
            res.json('ok');
        }
        catch (error) {
            return res.status(500).json({ msg: 'server mistake', error: error });
        }
    }),
    postPhoto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { photo, lastModified } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty())
            return res.status(404).json((0, express_validator_1.validationResult)(req).array());
        try {
            const photoUrl = yield cloudinary_1.default.uploader.upload(photo, { folder: 'floroteka' });
            const airtableData = {
                fields: {
                    photos: [{ url: photoUrl.url }],
                    lastModified: lastModified.toString()
                }
            };
            yield (0, airtable_1.default)('galery').create([airtableData]);
            return res.json('ok');
        }
        catch (error) {
            return res.status(500).json([{ param: 'data.origin', msg: 'server mistake' }]);
        }
    }),
    postStudyProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { heading, description, stepPhotos, stepTexts } = req.body.data;
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            res.status(404).json((0, express_validator_1.validationResult)(req).array());
            return;
        }
        try {
            const stepPhotoUrls = yield stepPhotos.map((photo) => __awaiter(void 0, void 0, void 0, function* () {
                const url = yield cloudinary_1.default.uploader.upload(photo, { folder: 'floroteka' }).then(photo => photo.url);
                return url;
            }));
            const values = yield Promise.all(stepPhotoUrls);
            const airtableData = {
                fields: {
                    Name: heading,
                    description: description,
                    text: stepTexts.join('\n\n'),
                    date: (new Date).getTime(),
                    after: [],
                    before: [],
                    images: values.map(image => ({ url: image })),
                    type: 'studyProject'
                }
            };
            yield (0, airtable_1.default)('posts').create([airtableData]);
            res.json('ok');
        }
        catch (error) {
            res.status(500).json({ msg: 'server mistake', error: error });
        }
    }),
    postScienceActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { heading, description, img } = req.body.data;
            if (!(0, express_validator_1.validationResult)(req).isEmpty())
                return res.status(404).json((0, express_validator_1.validationResult)(req).array());
            try {
                const imageUrl = yield cloudinary_1.default.uploader.upload(img).then(resp => resp.url);
                const airtableData = {
                    fields: {
                        Name: heading,
                        description: description,
                        text: '',
                        date: (new Date).getTime(),
                        after: [],
                        before: [],
                        images: [{ url: imageUrl }],
                        type: 'scienceActivity'
                    }
                };
                yield (0, airtable_1.default)('posts').create([airtableData]);
                return res.json('ok');
            }
            catch (error) {
                return res.status(500).json([{ param: 'data.origin', msg: 'server mistake' }]);
            }
        });
    }
};
