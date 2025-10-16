import { createLogger } from '@bobs-corn/logger'
import { buildCornService } from '@bobs-corn/core'
import { Response, Request, NextFunction } from 'express'
import { buildAppService } from '@/api/services/appService'

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
