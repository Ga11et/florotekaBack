import { Request, Response } from 'express'
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

  base('admins').select().eachPage( async (records: any) => {
    const returnValue = records.map((el: any) => {
      const adminItem: any = {
        login: el.fields.login,
        pass: el.fields.password
      }
      return adminItem
    })
    const user = returnValue.find((el: any) => el.login === login)
    if (!user) {
      res.status(404).json({ error: 'Неверно введенные данные' })
      return
    }

    const isPassValid = bcrypt.compareSync(pass, user.pass) 
    if (!isPassValid) {
      res.status(404).json({ error: 'Неверно введенные данные' })
      return
    }

    const token = jwt.sign({ login, pass }, 'secret', { expiresIn: '1h' })
    res.status(200).json({ token: token })
  })
}

export const postBeforeAfter = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { heading, description, before, after } = req.body.data
  if (!validationResult(req).isEmpty()) {
    res.status(404).json(validationResult(req).array())
    return
  }

  res.json('ok')
}