import express, { NextFunction, Request, Response } from 'express'
import cornRouter from '@/routes/cornRoutes'
import createLogger, { requestLogger } from '@/libs/logger'
import rateLimit from 'express-rate-limit'

const createApp = (): express.Application => {
  const app = express()
  const logger = createLogger()

  app.use(express.json())
  app.use(requestLogger)

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message)
    res.status(500).json({ message: 'Internal server error' })
  })

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'OK',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  })

  const limiter = rateLimit({
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

  // Apply rate limit to corn routes
  app.use('/corn', limiter, cornRouter)

  return app
}

const app = createApp()

export { createApp }
export default app
