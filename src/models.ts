export type postType = 'scienceActivity' | 'beforeAfter' | 'technologies' | 'things'
export type PlantType = 'Деревья' | 'Декоративные кустарники' | 'Плодово-ягодные деревья и кустарники' |
  'Ягодники' | 'Многолетние декоративные травянистые растения' | 'Однолетние декоративные травянистые растения' |
  'Почвопокровные растения' | 'Декоративные объекты' | 'Комнатные растения' | 'Овощные культуры'

export type plantPropsType = {
  name: string
  description: string
  img: string[]
  id: string
  latin: string
  date: string
  family: string
  from: string
  livingPlace: string
  having: boolean
  type: PlantType
}
export type beforeAfterPostPropsType = {
  id: string
  heading: string
  date: string
  text: string
  before: string
  after: string
}
export type PostPropsType = {
  id: string
  heading: string
  describtion: string
  date: number
  text: string
  before: string
  after: string
  images: string[]
  type: postType
}
export type plantAirtableContentType = {
  fields: {
    Name: string
    image: { url: string }[]
    id: string
    description: string
    latin: string
    date: string
    family: string
    from: string
    livingPlace: string
    having: boolean
    type: PlantType
  }
}
export type beboreAfterAirtableContentType = {
  fields: {
    Name: string
    after: [
      { url: string }
    ]
    before: [
      { url: string }
    ]
    id: string
    date: string
    heading: string
    text: string
  }
}
export type postAirtableContentType = {
  fields: {
    Name: string
    after: [
      { url: string }
    ]
    before: [
      { url: string }
    ]
    images: { url: string }[]
    id: string
    date: string
    heading: string
    text: string
    type: postType
  }
}
export type AirtableResponsePostRecordType = {
  _rawJson: {
    fields: {
      Name: string
      after: [
        { url: string }
      ]
      before: [
        { url: string }
      ]
      images: { url: string }[]
      id: string
      date: string
      heading: string
      text: string
      type: postType
    }
  }
}

