import { Request, Response } from 'express'
import { fileURLToPath } from 'url'
import base from '../airtable'
import { AirtablePlantType, AirtablePlantUpdateType } from '../models/airtableModels'
import { loginServises } from '../servises/loginServises'

export const updateControllers = {
  updatePlant: async (req: Request, res: Response) => {
    try {
      const { plantId, pass, formData } = req.body.data

      if (!pass) return res.status(422).json([{ param: 'data.origin', msg: "Не отправлен пароль" }])

      const admin = await base('admins').find(req.body.user.id)
      if (!admin) return res.status(422).json([{ param: 'data.origin', msg: "Вы не авторизованы" }])

      const isPassValid = loginServises.checkPass(pass, admin.fields.password)
      if (!isPassValid) return res.status(422).json([{ param: 'data.origin', msg: "Введен неправильный пароль" }])

      const plant = await base('plants').find(plantId)
      if (!plant) return res.status(422).json([{ param: 'data.origin', msg: "Такого растения нет в базе" }])

      const newPlantData: AirtablePlantUpdateType = {
        id: plantId,
        fields: {
          Name: formData.name,
          latin: formData.latin,
          description: formData.description,
          date: formData.date,
          family: formData.family,
          from: formData.from,
          having: formData.having,
          livingPlace: formData.livingPlace,
          type: formData.type
        }
      } 

      await base('plants').update([newPlantData])

      return res.status(200).json('ok')
    } catch (error) {
      console.log(error)
      return res.status(500).json([{ param: 'data.origin', msg: "Серверная ошибка", error: error }])
    }
  }
}