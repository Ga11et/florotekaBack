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

export const postTechnologiesValidator = [
  body('data.heading', 'Заголовок должен существовать').isLength({min: 1}),
  body('data.description', 'Описание должно существовать').isLength({min: 1}),
  body('data.stepPhotos', 'Хотя бы один шаг должен существовать').isLength({min: 1}),
  body('data.stepTexts', 'Хотя бы один шаг должен существовать').isLength({min: 1}),
  body('data.stepTexts', 'Шаги должны быть заполненны полностью').custom((value) => value.findIndex((el: string) => el === '') === -1),
  body('data.stepPhotos', 'Шаги должны быть заполненны полностью').custom((value) => value.findIndex((el: string) => el === '') === -1)
]

export const postThingsValidator = [
  body('data.heading', 'Заголовок должен существовать').isLength({min: 1}),
  body('data.description', 'Описание должно существовать').isLength({min: 1}),
  body('data.photos', 'Хотя бы одно фото должно существовать').isLength({min: 1}),
  body('data.photos', 'Все поля фотографий должны быть заполнены').custom((value) => value.findIndex((el: string) => el === '') === -1),
]

export const postPhotoValidator = [
  body('data.photo', 'Фото должно существовать').isLength({min: 1}),
]

export const postAuthValidator = [
  body('data.login', 'Поле должно быть заполнено').isLength({min: 1}),
  body('data.pass', 'Поле должно быть заполнено').isLength({min: 1}),
]

export const postScienceActivityValidator = [
  body('data.heading', 'Заголовок должен существовать').isLength({min: 1}),
  body('data.description', 'Описание должно существовать').isLength({min: 1}),
  body('data.img', 'Хотя бы одно фото должно существовать').isLength({min: 1}),
]
