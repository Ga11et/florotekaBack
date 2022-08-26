import { postType } from '../models'
import { PlantsType } from './appTypes'

export type AirtableImageType = {
  id: string
  url: string
  thumbnails: {
    large: { url: string }
    full: { url: string }
  }
}

export type AirtablePostType = {
  fields: {
    Name: string
    description: string
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
    description: string
    text: string
    date: number
    images: AirtableImageType[]
    before: AirtableImageType[]
    after: AirtableImageType[]
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
    lastModified: string
  }
}
export type AirtableGaleryRecordType = {
  id: string
  fields: {
    photos: AirtableImageType[]
    lastModified: string
  }
}

export type AirtablePlantType = {
  fields: {
    Name: string
    latin: string
    description: string
    date: string
    family: string
    from: string
    livingPlace: string
    having: boolean
    type: PlantsType
    image: { url: string }[]
  }
}
export type AirtablePlantRecordType = {
  id: string
  fields: {
    Name: string
    latin: string
    description: string
    date: string
    family: string
    from: string
    livingPlace: string
    having: boolean
    type: PlantsType
    image: AirtableImageType[]
  }
}
export type AirtablePlantUpdateType = {
  id: string
  fields: {
    Name: string
    latin: string
    description: string
    date: string
    family: string
    from: string
    livingPlace: string
    having: boolean
    type: PlantsType
  }
}