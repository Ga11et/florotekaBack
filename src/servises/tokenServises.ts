import jwt from 'jsonwebtoken'
require('dotenv').config({path: process.cwd() + '/.env'})

export const tokenServises = {
  checkAccessToken: (token: string) => {
    return jwt.verify(token, process.env.JWT_TOKEN || 'secret')
  },
  checkRefreshToken: (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN || 'secret')
  }
}