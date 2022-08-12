import { postAuthValidator, postPhotoValidator } from './../validations/validations';
import { getControllers } from './../controllers/get';
import { Request, Response } from 'express'
import { postControllers } from '../controllers/post'
import authMiddleware from '../middlewares/authMiddleware'
import { postBeforeAfterValidator, postPlantValidator, postTechnologiesValidator, postThingsValidator } from '../validations/validations'
const Router = require('express').Router

const router = new Router()

router.get('/', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.json('main')
})
router.get('/plants', getControllers.getPlants)
router.get('/posts', getControllers.getPosts)
router.get('/galery', getControllers.getPhotos)
router.get('/refresh', getControllers.getRefresh)
router.post('/login', postAuthValidator, postControllers.postAuth)
router.post('/plants', authMiddleware, postPlantValidator, postControllers.postPlant)
router.post('/beforeAfter', authMiddleware,  postBeforeAfterValidator, postControllers.postBeforeAfter)
router.post('/technologies', authMiddleware, postTechnologiesValidator, postControllers.postTechnologies)
router.post('/things', authMiddleware, postThingsValidator, postControllers.postThings)
router.post('/galery', authMiddleware, postPhotoValidator, postControllers.postPhoto)
router.post('/studyProject', authMiddleware, postTechnologiesValidator, postControllers.postStudyProject)


export default router