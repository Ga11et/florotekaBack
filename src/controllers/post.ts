import { AirtableAdminRecordType, AirtableGaleryRecordType, AirtableGaleryType, AirtablePlantType } from './../models/airtableModels';
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import base from '../airtable'
import cloudinary from '../cloudinary'
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
      const { name, latin, description, date, family, from, having, type, livingPlace, img } = req.body.data

      const promises = img.map( async (el: string) => {
        return await cloudinary.uploader.upload(el, { folder: 'floroteka' })
      } )

      const cloudinaryResponse = await Promise.all(promises)

      const airtableData: AirtablePlantType = {
        fields: {
          Name: name,
          latin: latin,
          description: description,
          date: date,
          family: family,
          from: from,
          having: having,
          type: type,
          livingPlace: livingPlace,
          image: cloudinaryResponse.map( resp => ({ url: resp.url }))
        }
      }

      await base('plants').create([airtableData])

      res.json('ok')
    } catch (err) {
      console.log(err)
    }

  },

  postAuth: async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(422).json(validationResult(req).array())
      return
    }
    try {
      const { login, pass } = req.body.data

      const records = await base('admins').select().firstPage() as AirtableAdminRecordType[]
      const usersData = loginServises.getData(records)

      const user = usersData.find(el => el.login === login)
      if (!user) return res.status(400).json({ error: 'Неверно введенные данные' })

      const isPassValid = bcrypt.compareSync(pass, user.pass)
      if (!isPassValid) return res.status(400).json({ error: 'Неверно введенные данные' })

      const tokens = await loginServises.generateTokens({ id: user.id, login: user.login })

      res.status(200)
        .cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', httpOnly: true, secure: true })
        .json({ token: tokens.accessToken })
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
      const beforeUrl = await cloudinary.uploader.upload(before, { folder: 'floroteka' })
        .then(resp => resp.url)
      const afterUrl = await cloudinary.uploader.upload(after, { folder: 'floroteka' })
        .then(resp => resp.url)

      const airtableData: AirtablePostType = {
        fields: {
          Name: heading,
          description: description,
          text: description,
          date: (new Date).getTime(),
          after: [{ url: afterUrl }],
          before: [{ url: beforeUrl }],
          images: [],
          type: 'beforeAfter'
        }
      }

      await base('posts').create([airtableData])

      res.json('ok')
    } catch (error) {
      res.status(500).json({ msg: 'server mistake', error: error })
    }
  },

  postTechnologies: async (req: Request, res: Response) => {
    const { heading, description, stepPhotos, stepTexts } = req.body.data
    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }

    try {
      const stepPhotoUrls = await stepPhotos.map(async (photo: string) => {
        const url = await cloudinary.uploader.upload(photo, { folder: 'floroteka' }).then(photo => photo.url)
        return url
      })

      const values = await Promise.all(stepPhotoUrls)

      const airtableData: AirtablePostType = {
        fields: {
          Name: heading,
          description: description,
          text: stepTexts.join('\n\n'),
          date: (new Date).getTime(),
          after: [],
          before: [],
          images: values.map(image => ({ url: image })),
          type: 'technologies'
        }
      }

      await base('posts').create([airtableData])

      res.json('ok')
    } catch (error) {
      res.status(500).json({ msg: 'server mistake', error: error })
    }


  },

  postThings: async (req: Request, res: Response) => {
    const { heading, description, photos } = req.body.data

    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }

    try {
      const photoUrls = await photos.map((photo: string) => {
        return cloudinary.uploader.upload(photo, { folder: 'floroteka' })
      })

      const urls = await Promise.all(photoUrls)

      const airtableData: AirtablePostType = {
        fields: {
          Name: heading,
          description: description,
          text: '',
          date: (new Date).getTime(),
          after: [],
          before: [],
          images: urls.map(image => ({ url: image.url })),
          type: 'things'
        }
      }

      await base('posts').create([airtableData])

      res.json('ok')
    } catch (error) {
      return res.status(500).json({ msg: 'server mistake', error: error })
    }
  },

  postPhoto: async (req: Request, res: Response) => {
    const { photo } = req.body.data

    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }

    try {
      const photoUrl = await cloudinary.uploader.upload(photo, { folder: 'floroteka' })

      const airtableData: AirtableGaleryType = {
        fields: {
          photos: [{ url: photoUrl.url }]
        }
      }

      await base('galery').create([airtableData])
      
      res.json('ok')
    } catch (error) {
      return res.status(500).json({ msg: 'server mistake', error: error })
    }
  },

  postStudyProject: async (req: Request, res: Response) => {
    const { heading, description, stepPhotos, stepTexts } = req.body.data
    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }

    try {
      const stepPhotoUrls = await stepPhotos.map(async (photo: string) => {
        const url = await cloudinary.uploader.upload(photo, { folder: 'floroteka' }).then(photo => photo.url)
        return url
      })

      const values = await Promise.all(stepPhotoUrls)

      const airtableData: AirtablePostType = {
        fields: {
          Name: heading,
          description: description,
          text: stepTexts.join('\n\n'),
          date: (new Date).getTime(),
          after: [],
          before: [],
          images: values.map(image => ({ url: image })),
          type: 'studyProject'
        }
      }

      await base('posts').create([airtableData])

      res.json('ok')
    } catch (error) {
      res.status(500).json({ msg: 'server mistake', error: error })
    }


  },
}

