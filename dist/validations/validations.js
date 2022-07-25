"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPlantValidator = void 0;
const express_validator_1 = require("express-validator");
exports.postPlantValidator = [
    (0, express_validator_1.check)('data.name', 'название должно существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.latin', 'латинское название должно существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.description', 'описание должно существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.date', 'дата посадки должна существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.family', 'царство должно существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.from', 'поле должно должно существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.livingPlace', 'районирование должно существовать').isLength({ min: 3 }),
    (0, express_validator_1.check)('data.img[0]', 'фото должно существовать').isLength({ min: 3 })
];
