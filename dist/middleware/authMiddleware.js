"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    var _a;
    if (req.method === 'OPTIONS')
        next();
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(403).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }]);
        const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
        req.body.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(403).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }]);
    }
}
exports.default = authMiddleware;
