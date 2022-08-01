"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTechnologiesValidator = exports.postBeforeAfterValidator = exports.postPlantValidator = void 0;
const express_validator_1 = require("express-validator");
exports.postPlantValidator = [
    (0, express_validator_1.body)('data.name', 'Название должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.latin', 'Латинское название должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.description', 'Описание должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.date', 'Дата посадки должна существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.family', 'Царство должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.from', 'Поле должно должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.livingPlace', 'Районирование должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.img[0]', 'Фото должно существовать').isLength({ min: 1 })
];
exports.postBeforeAfterValidator = [
    (0, express_validator_1.body)('data.heading', 'Заголовок должен существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.description', 'Описание должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.before', 'фото должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.after', 'фото должно существовать').isLength({ min: 1 })
];
exports.postTechnologiesValidator = [
    (0, express_validator_1.body)('data.heading', 'Заголовок должен существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.description', 'Описание должно существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.stepPhotos', 'Хотя бы один шаг должен существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.stepTexts', 'Хотя бы один шаг должен существовать').isLength({ min: 1 }),
    (0, express_validator_1.body)('data.stepTexts', 'Шаги должны быть заполненны полностью').custom((value) => value.findIndex((el) => el === '') === -1),
    (0, express_validator_1.body)('data.stepPhotos', 'Шаги должны быть заполненны полностью').custom((value) => value.findIndex((el) => el === '') === -1)
];
