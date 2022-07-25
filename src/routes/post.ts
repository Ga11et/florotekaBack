import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import base from '../airtable'
import cloudinary from '../cloudinary'
import { plantAirtableContentType } from '../models'

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