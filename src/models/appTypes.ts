export type AdminType = {
  id: string
  login: string
  pass: string
}
export type GaleryPhotoType = {
  id: string
  image: string
}
export type plantPropsType = {
  id: string
  name: string
  latin: string
  description: string
  date: string
  family: string
  from: string
  livingPlace: string
  having: boolean
  img: string[]
  type: PlantsType
}


export type PlantsType = 'Деревья' | 'Декоративные кустарники' | 'Плодово-ягодные деревья и кустарники' |
'Ягодники' | 'Многолетние декоративные травянистые растения' | 'Однолетние декоративные травянистые растения' |
'Почвопокровные растения' | 'Декоративные объекты' | 'Комнатные растения' | 'Овощные культуры'