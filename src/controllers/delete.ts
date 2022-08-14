import { Request, Response } from 'express'
import base from '../airtable'
import { loginServises } from '../servises/loginServises'

export const deleteControllers = {
  deletePlant: async (req: Request, res: Response) => {
    try {
      const { id, pass } = req.body.data

      if (!pass) return res.status(422).json([{ param: 'data.origin', msg: "Не отправлен пароль" }])

      const admin = await base('admins').find(req.body.user.id)

      const isPassValid = loginServises.checkPass(pass, admin.fields.password)
      if (!isPassValid) return res.status(422).json([{ param: 'data.origin', msg: "Введен неправильный пароль" }])

      await base('plants').destroy([id])
      return res.status(200).json('ok')
    } catch (error) {
      return res.status(500).json([{ param: 'data.origin', msg: "Серверная ошибка", error: error }])
    }
  }
}