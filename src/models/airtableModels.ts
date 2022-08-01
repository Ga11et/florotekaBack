import { postType } from '../models'

export type AirtablePostType = {
  fields: {
    Name: string
    describtion: string
    text: string
    date: number
    images: { url: string }[]
    before: { url: string }[]
    after: { url: string }[]
    type: postType
  }
}

export type AirtablePostRecordType = {
  id: string
  fields: {
    Name: string
    describtion: string
    text: string
    date: number
    images: { url: string }[]
    before: { url: string }[]
    after: { url: string }[]
    type: postType
  }
}