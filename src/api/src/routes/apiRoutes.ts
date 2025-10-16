import { Router } from 'express'
import cornRoutes from './cornRoutes'
import userRoutes from './userRoutes'
import { limiter as defaultLimiter } from '../middlewares/rateLimiter'
import { RateLimitRequestHandler } from 'express-rate-limit'

export const createApiRoutes = (limiter?: RateLimitRequestHandler): Router => {
  const router = Router()

  router.use('/users', userRoutes)

  // Apply rate limit to corn routes
  router.use('/corns', limiter ?? defaultLimiter, cornRoutes)

  return router
}
