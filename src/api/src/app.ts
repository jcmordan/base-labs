import express from 'express'
import cornRouter from '@/api/routes/cornRoutes'
import appRoutes from '@/api/routes/appRoutes'
import {
  limiter as defaultLimiter,
  globalErrorHandler,
  requestLogger,
  initHandler,
} from '@/api/middlewares'
import { RateLimitRequestHandler } from 'express-rate-limit'

const createApp = (limiter?: RateLimitRequestHandler): express.Application => {
  const app = express()

  app.use(express.json())
  app.use(requestLogger)
  app.use(initHandler)

  app.use('/health', appRoutes)

  // Apply rate limit to corn routes
  app.use('/corn', limiter ?? defaultLimiter, cornRouter)

  // Global error handler
  app.use(globalErrorHandler)

  return app
}

const app = createApp()

export { createApp }
export default app
