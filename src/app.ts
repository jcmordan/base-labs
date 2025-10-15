import express from 'express'
import cornRouter from '@/routes/cornRoutes'

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

  app.use('/corn', cornRouter)

  return app
}

const app = createApp()

export { createApp }

export default app
