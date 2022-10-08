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
exports.deleteControllers = void 0;
const airtable_1 = __importDefault(require("../airtable"));
const loginServises_1 = require("../servises/loginServises");
exports.deleteControllers = {
    deletePlant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, pass } = req.body.data;
            if (!pass)
                return res.status(422).json([{ param: 'data.origin', msg: "Не отправлен пароль" }]);
            const admin = yield (0, airtable_1.default)('admins').find(req.body.user.id);
            const isPassValid = loginServises_1.loginServises.checkPass(pass, admin.fields.password);
            if (!isPassValid)
                return res.status(422).json([{ param: 'data.origin', msg: "Введен неправильный пароль" }]);
            yield (0, airtable_1.default)('plants').destroy([id]);
            return res.status(200).json('ok');
        }
        catch (error) {
            return res.status(500).json([{ param: 'data.origin', msg: "Серверная ошибка", error: error }]);
        }
    }),
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, pass } = req.body.data;
                if (!pass)
                    return res.status(422).json([{ param: 'data.origin', msg: "Не отправлен пароль" }]);
                const admin = yield (0, airtable_1.default)('admins').find(req.body.user.id);
                if (!admin)
                    return res.status(422).json([{ param: 'data.origin', msg: "Не получить найти роль" }]);
                const isPassValid = loginServises_1.loginServises.checkPass(pass, admin.fields.password);
                if (!isPassValid)
                    return res.status(422).json([{ param: 'data.origin', msg: "Введен неправильный пароль" }]);
                yield (0, airtable_1.default)('posts').destroy([id]);
                return res.status(200).json('ok');
            }
            catch (error) {
                return res.status(500).json([{ param: 'data.origin', msg: `Серверная ошибка ${error}` }]);
            }
        });
    },
    photo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { photoId } = req.body.data;
                const admin = yield (0, airtable_1.default)('admins').find(req.body.user.id);
                if (!admin)
                    return res.status(422).json([{ param: 'data.origin', msg: "Не получить найти роль" }]);
                yield (0, airtable_1.default)('galery').destroy([photoId]);
                return res.status(200).json('ok');
            }
            catch (error) {
                return res.status(500).json([{ param: 'data.origin', msg: `Серверная ошибка ${error}` }]);
            }
        });
    }
};
