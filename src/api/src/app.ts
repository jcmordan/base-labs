import express from 'express'
import appRoutes from '@/routes/appRoutes'
import cornRoutes from '@/routes/cornRoutes'
import {
  limiter as defaultLimiter,
  globalErrorHandler,
  requestLogger,
  initHandler,
} from '@/middlewares'
import { RateLimitRequestHandler } from 'express-rate-limit'

const createApp = (limiter?: RateLimitRequestHandler): express.Application => {
  const app = express()

  app.use(express.json())
  app.use(requestLogger)
  app.use(initHandler)

  app.use('/health', appRoutes)

  // Apply rate limit to corn routes
  app.use('/corn', limiter ?? defaultLimiter, cornRoutes)

  // Global error handler
  app.use(globalErrorHandler)

  return app
}

const app = createApp()

export { createApp }
export default app
