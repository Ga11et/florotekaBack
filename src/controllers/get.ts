import { AirtableTokenRecordType, AirtableAdminRecordType } from './../models/airtableModels';
import { Request, Response } from 'express';
import base from '../airtable';
import { plantPropsType, PostPropsType } from '../models';
import { AirtablePostRecordType } from '../models/airtableModels';
import { tokenServises } from '../servises/tokenServises';
import { loginServises } from '../servises/loginServises';

export const getControllers = {
  getPlants: async (req: Request, res: Response) => {
    base('plants').select({
      view: "Grid view"
    }).eachPage((records: any) => {
      const returnValue = records.map((el: any) => {
        const plantItem: plantPropsType = {
          name: el._rawJson.fields.Name,
          latin: el._rawJson.fields.latin,
          description: el._rawJson.fields.description,
          date: el._rawJson.fields.date,
          family: el._rawJson.fields.family,
          from: el._rawJson.fields.from,
          having: el._rawJson.fields.having,
          livingPlace: el._rawJson.fields.livingPlace,
          type: el._rawJson.fields.type,
          img: el._rawJson.fields.image.map((el: any) => el.url),
          id: el._rawJson.fields.id
        }
        return plantItem
      })
  
      res.json(returnValue)
  
    }, function done(err: any) {
      if (err) { res.json(err); return }
    });
  },
  
  getPosts: async (req: Request, res: Response) => {
    base('posts').select({
      view: "Grid view"
    }).eachPage((records: AirtablePostRecordType[]) => {
      const returnValue = records.map(el => {
        const postItem: PostPropsType = {
          id: el.id,
          heading: el.fields.Name,
          describtion: el.fields.describtion,
          text: el.fields.text,
          date: el.fields.date,
          after: el.fields.after ? el.fields.after[0].url : '',
          before: el.fields.before ? el.fields.before[0].url : '',
          images: el.fields.images ? el.fields.images.map(el => el.url) : [],
          type: el.fields.type
        }
        return postItem
      })
  
      res.json(returnValue)
  
    }, function done(err: any) {
      if (err) { res.json(err); return }
    });
  },

  getRefresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies
      const userData = tokenServises.checkRefreshToken(refreshToken) as { id: string, login: string }
      if (!userData.id) return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован" }])
      
      base('admins').select().eachPage( (records: AirtableAdminRecordType[]) => {

        const existedAdminRecord = records.find(el => el.id === userData.id)
        if (!existedAdminRecord) return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован" }])

        const tokens = loginServises.generateTokens({ id: userData.id, login: userData.login })
      
        res.status(200)
          .cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true })
          .json({token: tokens.accessToken})
      })
    } catch (error) {
      return res.status(401).json([{ param: 'data.origin', msg: "Не авторизован" }])
    }
  }
}

