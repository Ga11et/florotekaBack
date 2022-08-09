import { AirtableAdminRecordType } from './../models/airtableModels';
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import base from '../airtable'
import cloudinary from '../cloudinary'
import { plantAirtableContentType } from '../models'
import bcrypt from 'bcrypt'
import { AirtablePostType } from '../models/airtableModels'
import { loginServises } from '../servises/loginServises';

export const postControllers = {
  postPlant: async (req: Request, res: Response) => {
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
  
  },
  
  postAuth: async (req: Request, res: Response) => {
    try {
      const { login, pass } = req.body.data

      base('admins').select().eachPage((records: AirtableAdminRecordType[]) => {
      
        const usersData = loginServises.getData(records)
  
        const user = usersData.find( el => el.login === login)
        if (!user) return res.status(400).json({ error: 'Неверно введенные данные' })
    
        const isPassValid = bcrypt.compareSync(pass, user.pass)
        if (!isPassValid) return res.status(400).json({ error: 'Неверно введенные данные' })
        
        const tokens = loginServises.generateTokens({ id: user.id, login: user.login })
  
        res.status(200)
          .cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true })
          .json({token: tokens.accessToken})
      })
    } catch (error) {
      return res.status(400).json([{ param: 'data.origin', msg: error }])
    }
  },
  
  postBeforeAfter: async (req: Request, res: Response) => {
    const { heading, description, before, after } = req.body.data
    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }
    try {
      const beforeUrl = await cloudinary.uploader.upload(before)
        .then(resp => resp.url)
      const afterUrl = await cloudinary.uploader.upload(after)
        .then(resp => resp.url)
  
      const airtableData: AirtablePostType = {
        fields: {
          Name: heading,
          describtion: description,
          text: description,
          date: (new Date).getTime(),
          after: [{ url: afterUrl }],
          before: [{ url: beforeUrl }],
          images: [],
          type: 'beforeAfter'
        }
      }
      base('posts').create([airtableData])
    } catch (error) {
      res.status(500).json({ msg: 'server mistake', error: error })
    }
  
    res.json('ok')
  },
  
  postTechnologies: async (req: Request, res: Response) => {
    const { heading, description, stepPhotos, stepTexts } = req.body.data
    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }
  
    try {
      const stepPhotoUrls = await stepPhotos.map(async (photo: string) => {
        const url = await cloudinary.uploader.upload(photo).then(photo => photo.url)
        return url
      })
  
      Promise.all(stepPhotoUrls).then(values => {
  
  
        const airtableData: AirtablePostType = {
          fields: {
            Name: heading,
            describtion: description,
            text: stepTexts.join('\n\n'),
            date: (new Date).getTime(),
            after: [],
            before: [],
            images: values.map(image => ({ url: image })),
            type: 'technologies'
          }
        }
  
        base('posts').create([airtableData])
  
        res.json('ok')
      })
    } catch (error) {
      res.status(500).json({ msg: 'server mistake', error: error })
    }
  
  
  },
  
  postThings: async (req: Request, res: Response) => {
    const { heading, describtion, photos } = req.body.data
  
    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }
  
    try {
      const photoUrls = await photos.map((photo: string) => {
        return cloudinary.uploader.upload(photo)
      })
  
      Promise.all(photoUrls).then(urls => {
        
        const airtableData: AirtablePostType = {
          fields: {
            Name: heading,
            describtion: describtion,
            text: '',
            date: (new Date).getTime(),
            after: [],
            before: [],
            images: urls.map(image => ({ url: image.url })),
            type: 'things'
          }
        }
  
        base('posts').create([airtableData])
  
        res.json('ok')
      })
  
    } catch (error) {
      return res.status(500).json({ msg: 'server mistake', error: error })
    }
  }
}

