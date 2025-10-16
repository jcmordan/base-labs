import { z } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { createLogger } from '@bobs-corn/logger'

const logger = createLogger('validate')

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      logger.error('Invalid request', { error })
      res.status(400).json({ message: 'Invalid request' })
    }
  }
}
