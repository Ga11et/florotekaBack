import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import base from '../airtable'
import cloudinary from '../cloudinary'
import { plantAirtableContentType } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AirtablePostType } from '../models/airtableModels'

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

  try {
    const beforeUrl = await cloudinary.uploader.upload(req.body.data.before)
      .then( resp => resp.url)
    const afterUrl = await cloudinary.uploader.upload(req.body.data.after)
      .then( resp => resp.url)

    const airtableData: AirtablePostType = {
      fields: {
        Name: heading,
        describtion: description,
        text: description,
        date: (new Date).getTime(),
        after: [{ url: afterUrl}],
        before: [{ url: beforeUrl}],
        images: [],
        type: 'beforeAfter'
      }
    }
    base('posts').create([airtableData])
  } catch (error) {
    res.status(500).json({ msg: 'server mistake', error: error })
  }
  
  res.json('ok')
}

export const postTechnologies = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { heading, description, stepPhotos, stepTexts } = req.body.data
  if (!validationResult(req).isEmpty()) {
    res.status(404).json(validationResult(req).array())
    return
  }

  try {
    const stepPhotoUrls = await stepPhotos.map( async (photo: string) => {
      const url = await cloudinary.uploader.upload(photo).then( photo => photo.url )
      return url
    })
  
    Promise.all(stepPhotoUrls).then( values => {
      
      
      const airtableData: AirtablePostType = {
        fields: {
          Name: heading,
          describtion: description,
          text: stepTexts.join('\n\n'),
          date: (new Date).getTime(),
          after: [],
          before: [],
          images: values.map( image => ({ url: image })),
          type: 'technologies'
        }
      }
      
      base('posts').create([airtableData])

      res.json('ok')
    })
  } catch (error) {
    res.status(500).json({ msg: 'server mistake', error: error })
  }
  

}