import createLogger from '../libs/logger'
import rateLimit from 'express-rate-limit'

const logger = createLogger('rate-limiter')

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1, // limit each IP to 1 request per minute
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
