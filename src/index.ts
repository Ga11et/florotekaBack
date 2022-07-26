import { Request, Response } from "express"
import cors from 'cors'
import { getPlants, getPosts } from './routes/get'
import { postAuth, postPlant } from './routes/post'
import { postPlantValidator } from './validations/validations'

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
app.post('/plants', postPlantValidator, postPlant)
app.post('/login', postAuth)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})