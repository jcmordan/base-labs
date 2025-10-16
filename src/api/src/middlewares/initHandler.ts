import { createLogger } from '@bobs-corn/logger'
import { buildCornService, buildUserService } from '@bobs-corn/core'
import { Response, Request, NextFunction } from 'express'
import { buildAppService } from '@/services/appService'
import { verifyToken } from '@/lib/jwt'

export const initHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = createLogger('init-handler')
  logger.info('Initializing request')

  const authHeader = req.headers['authorization']
  const token = (authHeader && authHeader.split(' ')[1]) ?? ''

  req.locals = {
    user: verifyToken(token),
    services: {
      getAppService: buildAppService,
      getCornService: buildCornService,
      getUserService: buildUserService,
    },
  }

  next()
}
