import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const configPath = path.resolve('config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token Missing' })
  }

  jwt.verify(token, config.secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid Token' })
    }

    req.user = user
    next()
  })
}
