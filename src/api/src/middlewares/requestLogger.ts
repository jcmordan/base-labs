import { createLogger } from '@bobs-corn/logger'
import { NextFunction, Request, Response } from 'express'

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = createLogger()
  const start = Date.now()

  // Log request
  logger.info('Request started', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  })

  res.on('finish', () => {
    const duration = Date.now() - start

    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    })
  })

  next()
}
