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
        return await cloudinary.uploader.upload(el)
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

      base('plants').create([airtableData])


      res.json('ok')
    } catch (err) {
      console.log(err)
    }

  },

  postAuth: async (req: Request, res: Response) => {
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
  },

  postPhoto: async (req: Request, res: Response) => {
    const { photo } = req.body.data

    if (!validationResult(req).isEmpty()) {
      res.status(404).json(validationResult(req).array())
      return
    }

    try {
      const photoUrl = await cloudinary.uploader.upload(photo)

      const airtableData: AirtableGaleryType = {
        fields: {
          photos: [{ url: photoUrl.url }]
        }
      }

      base('galery').create([airtableData])
      
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
            type: 'studyProject'
          }
        }

        base('posts').create([airtableData])

        res.json('ok')
      })
    } catch (error) {
      res.status(500).json({ msg: 'server mistake', error: error })
    }


  },
}

