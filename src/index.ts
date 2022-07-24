import { Request, Response } from "express"
import cloudinary from "./cloudinary"
import cors from 'cors'

const express = require('express')
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cors())
// app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.json('main')
})
app.get('/plants', async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.json('plants')
})
app.post('/plants', async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const cloudinariResponse = await cloudinary.uploader.upload(req.body.data)
    console.log(cloudinariResponse)
    res.json(cloudinariResponse.url)
  }
  catch (err) {
    console.log(err)
  }
  
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})