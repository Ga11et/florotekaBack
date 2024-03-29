import jwt from 'jsonwebtoken';
import base from '../airtable';
import { AdminType } from '../models/appTypes';
import { AirtableAdminRecordType, AirtableTokenRecordType, AirtableTokenType } from './../models/airtableModels';
require('dotenv').config({path: process.cwd() + '/.env'})
import bcrypt from 'bcrypt'

export const loginServises = {
  getData: (records: AirtableAdminRecordType[]) => {
    const returnValue = records.map( el => {
      const adminItem: AdminType = {
        id: el.id,
        login: el.fields.login,
        pass: el.fields.password
      }
      return adminItem
    })

    return returnValue
  },

  generateTokens: async (data: { login: string, id: string }) => {
    const accessToken = jwt.sign(data, process.env.JWT_TOKEN || 'secret', { expiresIn: '2h' })
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_TOKEN || 'secret', { expiresIn: '30d' })

    const records = await base('tokens').select().firstPage() as AirtableTokenRecordType[]
    const existedRecord = records.find(el => data.id === el.fields.id)
    if (existedRecord !== undefined) await base('tokens').destroy([existedRecord.id])

    const airtableData: AirtableTokenType = {
      fields: {
        id: data.id,
        token: refreshToken
      }
    }
  
    await base('tokens').create([airtableData])
    
    return {
      accessToken,
      refreshToken
    }
  },

  checkPass: (pass: string, bcryptPass: string) => {
    return bcrypt.compareSync(pass, bcryptPass)
  }
}