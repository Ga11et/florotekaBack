import { body } from 'express-validator';

export const postPlantValidator = [
  body('data.name', 'название должно существовать').isLength({min: 2}),
  body('data.latin', 'латинское название должно существовать').isLength({min: 1}),
  body('data.description', 'описание должно существовать').isLength({min: 1}),
  body('data.date', 'дата посадки должна существовать').isLength({min: 1}),
  body('data.family', 'царство должно существовать').isLength({min: 1}),
  body('data.from', 'поле должно должно существовать').isLength({min: 1}),
  body('data.livingPlace', 'районирование должно существовать').isLength({min: 1}),
  body('data.img[0]', 'фото должно существовать').isLength({min: 1})
]