import { Router } from 'express'
import cornRoutes from './cornRoutes'
import userRoutes from './userRoutes'
import { limiter as defaultLimiter, authRequired } from '../middlewares'
import { RateLimitRequestHandler } from 'express-rate-limit'

export const createApiRoutes = (limiter?: RateLimitRequestHandler): Router => {
  const router = Router()

  router.use('/users', userRoutes)

  // Apply rate limit to corn routes
  router.use('/corns', authRequired, limiter ?? defaultLimiter, cornRoutes)

  return router
}
