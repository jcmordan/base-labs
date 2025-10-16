import { Request, Response } from 'express'
import { createLogger } from '@bobs-corn/logger'
import { generateToken } from '@/lib/jwt'

const logger = createLogger('user-controller')

const createUser = async (req: Request, res: Response) => {
  logger.info('Creating user')

  const userService = req.locals.services.getUserService()
  const user = await userService.createUser(req.body)

  // generate a token for the user
  // emulate authentication by generating a token for the user
  // real case scenario would be to use password verification
  const token = generateToken(user)

  logger.info('User created', { user })

  res.status(201).send({
    token,
    user,
  })
}

export { createUser }
