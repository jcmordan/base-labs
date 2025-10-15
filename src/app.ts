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
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1, // limit each IP to 1 requests per
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-Rate-Limit-*` headers
  })

  // Apply rate limit to corn routes
  app.use('/corn', limiter, cornRouter)

  return app
}

const app = createApp()

export { createApp }

export default app
