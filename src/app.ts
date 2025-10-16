import express from 'express'
import cornRouter from '@/routes/cornRoutes'
import appRoutes from '@/routes/appRoutes'
import { initHandler } from './middleware/initHandler'
import { limiter, globalErrorHandler, requestLogger } from '@/middleware'

const createApp = (): express.Application => {
  const app = express()

  app.use(express.json())
  app.use(requestLogger)
  app.use(initHandler)

  app.use('/health', appRoutes)

  // Apply rate limit to corn routes
  app.use('/corn', limiter, cornRouter)

  // Global error handler
  app.use(globalErrorHandler)

  return app
}

const app = createApp()

export { createApp }
export default app
