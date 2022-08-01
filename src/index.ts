import { Request, Response } from "express"
import cors from 'cors'
import { getPlants, getPosts } from './routes/get'
import { postAuth, postBeforeAfter, postPlant, postTechnologies } from './routes/post'
import { postBeforeAfterValidator, postPlantValidator, postTechnologiesValidator } from './validations/validations'
import authMiddleware from './middleware/middleware'

const express = require('express')
const app = express()

app.use(express.json({ limit: '5mb' }))
app.use(cors())
// app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.json('main')
})
app.get('/plants', getPlants)
app.get('/posts', getPosts)
app.post('/login', postAuth)
app.post('/plants', authMiddleware, postPlantValidator, postPlant)
app.post('/beforeAfter', authMiddleware,  postBeforeAfterValidator, postBeforeAfter)
app.post('/technologies', authMiddleware, postTechnologiesValidator, postTechnologies)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})