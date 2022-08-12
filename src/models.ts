export type postType = 'studyProject' | 'scienceActivity' | 'beforeAfter' | 'technologies' | 'things'

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
  description: string
  date: number
  text: string
  before: string
  after: string
  images: string[]
  type: postType
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

