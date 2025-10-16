import express from 'express'
import appRoutes from '@/routes/appRoutes'

import { globalErrorHandler, requestLogger, initHandler } from '@/middlewares'
import { RateLimitRequestHandler } from 'express-rate-limit'
import cors from 'cors'
import { config } from './lib/config'
import { createApiRoutes } from './routes/apiRoutes'
require('dotenv').config()

const createApp = (limiter?: RateLimitRequestHandler): express.Application => {
  const app = express()
  app.use(express.json())

  app.use(
    cors({
      origin: config.webUrl,
      credentials: true,
    }),
  )

  app.use(requestLogger)
  app.use(initHandler)

  app.use('/health', appRoutes)
  app.use('/api', createApiRoutes(limiter))

  // Global error handler
  app.use(globalErrorHandler)

  return app
}

const app = createApp()

export { createApp }
export default app
