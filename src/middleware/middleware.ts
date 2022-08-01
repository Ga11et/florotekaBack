import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') next()

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(403).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }])
    const decodedToken = jwt.verify(token, 'secret')
    req.body.user = decodedToken
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }])
  }
}