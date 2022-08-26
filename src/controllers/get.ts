import { AirtableAdminRecordType, AirtableGaleryRecordType, AirtablePlantRecordType } from './../models/airtableModels';
import { Request, Response } from 'express';
import base from '../airtable';
import { PostPropsType } from '../models';
import { AirtablePostRecordType } from '../models/airtableModels';
import { tokenServises } from '../servises/tokenServises';
import { loginServises } from '../servises/loginServises';
import { GaleryPhotoType, plantPropsType } from '../models/appTypes';
import { mainServises } from '../servises/mainServises';

export const getControllers = {
  getPlants: async (req: Request, res: Response) => {
    const records = await base('plants').select().firstPage() as AirtablePlantRecordType[]

    const returnValue = records.map(el => {
      const plantItem: plantPropsType = {
        id: el.id,
        name: el.fields.Name,
        latin: el.fields.latin,
        description: el.fields.description,
        date: el.fields.date,
        family: el.fields.family,
        from: el.fields.from,
        having: el.fields.having,
        livingPlace: el.fields.livingPlace,
        type: el.fields.type,
        img: mainServises.imageMapping(el.fields.image)
      }
      return plantItem
    })
  
    res.json(returnValue)
  },
  
  getPosts: async (req: Request, res: Response) => {

    const records = await base('posts').select().firstPage() as AirtablePostRecordType[]

    const returnValue = records.map(el => {
      const postItem: PostPropsType = {
        id: el.id,
        heading: el.fields.Name,
        description: el.fields.description,
        text: el.fields.text,
        date: el.fields.date,
        after: el.fields.after ? mainServises.imageMapping(el.fields.after)[0] : { small: '', full: '', id: '' },
        before: el.fields.before ? mainServises.imageMapping(el.fields.before)[0] : { small: '', full: '', id: '' },
        images: el.fields.images ? mainServises.imageMapping(el.fields.images) : [],
        type: el.fields.type
      }
      return postItem
    })

    res.json(returnValue)
  },

  getPhotos: async (req: Request, res: Response) => {

    const records = await base('galery').select().firstPage() as AirtableGaleryRecordType[]

    const returnValue: GaleryPhotoType[]  = records.map( record => ({
      id: record.id,
      image: mainServises.imageMapping(record.fields.photos)[0],
      lastModified: record.fields.lastModified
    }))

    res.status(200).json(returnValue)
   
  },

  getRefresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies
      const userData = tokenServises.checkRefreshToken(refreshToken) as { id: string, login: string }
      if (!userData.id) return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован (refresh token is unavailable))" }])

      const records = await base('admins').select().firstPage() as AirtableAdminRecordType[]
      
      const existedAdminRecord = records.find(el => el.id === userData.id)
      if (!existedAdminRecord) return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован (admin is unavailable)" }])

      const tokens = await loginServises.generateTokens({ id: userData.id, login: userData.login })
    
      res.status(200)
        .cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true })
        .json({token: tokens.accessToken})
    } catch (error) {
      return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован", error: error }])
    }
  }
}
