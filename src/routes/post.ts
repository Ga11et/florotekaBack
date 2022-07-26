import e, { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import base from '../airtable'
import cloudinary from '../cloudinary'
import { plantAirtableContentType } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const postPlant = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (!validationResult(req).isEmpty()) {
    res.status(422).json(validationResult(req).array())
    return
  }
  try {
    const cloudinariResponse = await cloudinary.uploader.upload(req.body.data.img[0])

    const airtableData: plantAirtableContentType = {
      fields: {
        Name: req.body.data.name,
        latin: req.body.data.latin,
        description: req.body.data.description,
        date: req.body.data.date,
        family: req.body.data.family,
        from: req.body.data.from,
        having: req.body.data.having,
        type: req.body.data.type,
        livingPlace: req.body.data.livingPlace,
        id: req.body.data.id,
        image: [{ url: cloudinariResponse.url }]
      }
    }
    base('plants').create([airtableData])


    res.json('ok')
  } catch (err) {
    console.log(err)
  }

}

export const postAuth = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { login, pass } = req.body.data
  try {

    base('admins').select().eachPage((records: any) => {
      const formattedData = records.map((el: any) => ({ login: el.fields.login, pass: el.fields.password }))
      const user = formattedData.find((el: any) => el.login == login)
      if (!user) res.status(404).json('Неверно введенные данные')
      const isPassValid = bcrypt.compareSync(pass, formattedData[0].pass)
      if (!isPassValid) res.status(404).json('Неверно введенные данные')
      const token = jwt.sign({ login, pass }, 'secret', { expiresIn: '1h' })
      res.status(200).json(token)
    })

  } catch (error) {
    console.log(error)   
  }
  
}