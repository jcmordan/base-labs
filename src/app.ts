import express from 'express'
import cornRouter from '@/routes/cornRoutes'
import rateLimit from 'express-rate-limit'

const createApp = (): express.Application => {
  const app = express()

  app.use(express.json())

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
      console.log(
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
