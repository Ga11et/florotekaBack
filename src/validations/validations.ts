import { body } from 'express-validator';

export const postPlantValidator = [
  body('data.name', 'Название должно существовать').isLength({min: 1}),
  body('data.latin', 'Латинское название должно существовать').isLength({min: 1}),
  body('data.description', 'Описание должно существовать').isLength({min: 1}),
  body('data.date', 'Дата посадки должна существовать').isLength({min: 1}),
  body('data.family', 'Царство должно существовать').isLength({min: 1}),
  body('data.from', 'Поле должно должно существовать').isLength({min: 1}),
  body('data.livingPlace', 'Районирование должно существовать').isLength({min: 1}),
  body('data.img[0]', 'Фото должно существовать').isLength({min: 1})
]

export const postBeforeAfterValidator = [
  body('data.heading', 'Заголовок должен существовать').isLength({min: 1}),
  body('data.description', 'Описание должно существовать').isLength({min: 1}),
  body('data.before', 'фото должно существовать').isLength({min: 1}),
  body('data.after', 'фото должно существовать').isLength({min: 1})
]