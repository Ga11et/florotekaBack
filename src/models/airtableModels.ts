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

export type AirtableAdminRecordType = {
  id: string
  fields: {
    login: string
    password: string
  }
}

export type AirtableTokenType = {
  fields: {
    id: string
    token: string
  }
}
export type AirtableTokenRecordType = {
  id: string
  fields: {
    id: string
    token: string
  }
}

export type AirtableGaleryType = {
  fields: {
    photos: { url: string }[]
  }
}
export type AirtableGaleryRecordType = {
  id: string
  fields: {
    photos: { url: string }[]
  }
}