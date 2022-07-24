import { Request, Response } from "express"
import cloudinary from "./cloudinary"
import cors from 'cors'

const express = require('express')
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cors())
// app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

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

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})