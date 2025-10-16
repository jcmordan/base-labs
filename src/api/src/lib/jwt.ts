import { SignOptions } from "jsonwebtoken"
import { config } from "./config"
import jwt from "jsonwebtoken"
import { User } from "@bobs-corn/core"

export const generateToken = (user: User) => {
  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn as any,
  }

  return jwt.sign(user, config.jwt.secret, options)
}

export const verifyToken = (token: string): User | null => {
  if (!token) {
    return null
  }

  const decoded = jwt.verify(token, config.jwt.secret) as User
  return decoded
}