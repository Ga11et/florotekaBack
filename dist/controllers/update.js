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
exports.updateControllers = void 0;
const airtable_1 = __importDefault(require("../airtable"));
const loginServises_1 = require("../servises/loginServises");
exports.updateControllers = {
    updatePlant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { plantId, pass, formData } = req.body.data;
            if (!pass)
                return res
                    .status(422)
                    .json([{ param: "data.origin", msg: "Не отправлен пароль" }]);
            const admin = yield (0, airtable_1.default)("admins").find(req.body.user.id);
            if (!admin)
                return res
                    .status(422)
                    .json([{ param: "data.origin", msg: "Вы не авторизованы" }]);
            const isPassValid = loginServises_1.loginServises.checkPass(pass, admin.fields.password);
            if (!isPassValid)
                return res
                    .status(422)
                    .json([{ param: "data.origin", msg: "Введен неправильный пароль" }]);
            const plant = yield (0, airtable_1.default)("plants").find(plantId);
            if (!plant)
                return res
                    .status(422)
                    .json([{ param: "data.origin", msg: "Такого растения нет в базе" }]);
            const newPlantData = {
                id: plantId,
                fields: {
                    Name: formData.name,
                    latin: formData.latin,
                    description: formData.description,
                    date: formData.date,
                    family: formData.family,
                    from: formData.from,
                    having: formData.having,
                    livingPlace: formData.livingPlace,
                    type: formData.type,
                },
            };
            yield (0, airtable_1.default)("plants").update([newPlantData]);
            return res.status(200).json("ok");
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json([
                { param: "data.origin", msg: "Серверная ошибка", error: error },
            ]);
        }
    }),
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
                const { postId } = req.params;
                const admin = yield (0, airtable_1.default)("admins").find(req.body.user.id);
                if (!admin)
                    return res
                        .status(422)
                        .json([{ param: "data.origin", msg: "Вы не авторизованы" }]);
                const post = yield (0, airtable_1.default)("posts").find(postId);
                if (!post)
                    return res
                        .status(422)
                        .json([{ param: "data.origin", msg: "Такого растения нет в базе" }]);
                const newPostData = {
                    id: postId,
                    fields: {
                        Name: data.heading,
                        description: data.description,
                        type: data.type,
                        date: data.date,
                        after: [],
                        before: [],
                        images: data.images,
                        text: "",
                    },
                };
                console.log(data.images);
                yield (0, airtable_1.default)("posts").update([newPostData]);
                return res.status(200).json("ok");
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json([
                    { param: "data.origin", msg: "Серверная ошибка", error: error },
                ]);
            }
        });
    },
};
