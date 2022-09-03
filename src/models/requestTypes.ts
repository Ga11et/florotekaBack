import { AdminType } from './appTypes'

export type scienceActivityRequest = {
  data: {
    heading: string
    description: string
    img: string
  }
}
export type galeryRequest = {
  data: {
    photo: string
    lastModified: string
  }
}
export type plantDeletingRequest = {
  data: {
    id: string
    pass: string
  }
  user: AdminType
}