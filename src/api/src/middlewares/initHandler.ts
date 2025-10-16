import createLogger from '@/libs/logger'
import { Response, Request, NextFunction } from 'express'
import { buildCornService } from '../services/cornService'
import { buildAppService } from '../services/appService'

export const initHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = createLogger('init-handler')
  logger.info('Initializing request')
  req.locals = {
    services: {
      getAppService: buildAppService,
      getCornService: buildCornService,
    },
  }

  next()
}
