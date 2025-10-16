import { createLogger } from '@bobs-corn/logger'
import rateLimit from 'express-rate-limit'

const logger = createLogger('rate-limiter')
const DEFAULT_WINDOW_SECONDS = 60 // 1 minute
const DEFAULT_MAX = 1 // limit each IP to 1 request per minute

export const createLimiter = () => {
  const windowMs =
    +(process.env.RATE_LIMIT_WINDOW_MS ?? DEFAULT_WINDOW_SECONDS) * 1000

  const limiter = rateLimit({
    windowMs,
    max: +(process.env.RATE_LIMIT_MAX ?? DEFAULT_MAX),
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
  })

  return limiter
}

export const limiter = createLimiter()
