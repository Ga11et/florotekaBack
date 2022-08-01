import { Request, Response } from 'express';
import base from '../airtable';
import { plantPropsType, PostPropsType } from '../models';
import { AirtablePostRecordType } from '../models/airtableModels';

export const getPlants = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
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
}

export const getPosts = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
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
}