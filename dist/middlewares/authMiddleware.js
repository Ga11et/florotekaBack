"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenServises_1 = require("../servises/tokenServises");
function authMiddleware(req, res, next) {
    var _a;
    if (req.method === 'OPTIONS')
        next();
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(401).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }]);
        const userData = tokenServises_1.tokenServises.checkAccessToken(token);
        req.body.user = userData;
        next();
    }
    catch (error) {
        return res.status(401).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }]);
    }
}
exports.default = authMiddleware;
