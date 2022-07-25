import { body, check } from 'express-validator';

export const postPlantValidator = [
  check('data.name', 'название должно существовать').isLength({min: 3}),
  check('data.latin', 'латинское название должно существовать').isLength({min: 3}),
  check('data.description', 'описание должно существовать').isLength({min: 3}),
  check('data.date', 'дата посадки должна существовать').isLength({min: 3}),
  check('data.family', 'царство должно существовать').isLength({min: 3}),
  check('data.from', 'поле должно должно существовать').isLength({min: 3}),
  check('data.livingPlace', 'районирование должно существовать').isLength({min: 3}),
  check('data.img[0]', 'фото должно существовать').isLength({min: 3})
]