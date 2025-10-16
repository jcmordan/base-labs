import { createLogger } from '@bobs-corn/logger'
import { NextFunction, Request, Response } from 'express'

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const logger = createLogger('error-handler')
  logger.error('And error occurred', { error: err })
  res.status(500).json({ message: 'Internal server error' })
}
