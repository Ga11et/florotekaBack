import { NextFunction, Request, Response } from 'express'
import { tokenServises } from '../servises/tokenServises'

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') next()

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }])
    const userData = tokenServises.checkAccessToken(token)
    req.body.user = userData
    next()
  } catch (error) {
    return res.status(401).json([{ param: 'data.origin', msg: 'Пользователь не авторизован' }])
  }
}