import { createLogger } from '@bobs-corn/logger'
import rateLimit, { ipKeyGenerator } from 'express-rate-limit'
import { config } from '@/lib/config'
import { ValueDeterminingMiddleware } from 'express-rate-limit'

const logger = createLogger('rate-limiter')

export const createLimiter = () => {
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: 'Too many requests, please try again later.',
    },
    handler: (req, res) => {
      logger.info(
        `🚫 Rate limit reached for client ${req.ip} - too many corn purchases!`,
      )
      res.status(429).json({
        message: 'Too many requests, please try again later.',
      })
    },
    keyGenerator: (req) => {
      return req.locals.user?.id ?? ipKeyGenerator(req.ip ?? '')
    },
  })

  return limiter
}

export const limiter = createLimiter()
