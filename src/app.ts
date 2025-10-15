import express from 'express'
import cornRouter from '@/routes/cornRoutes'

const createApp = (): express.Application => {
  const app = express()

  app.use(express.json())

  app.get('/hello', (_req, res) => {
    res.send('Hello, base-labs!!')
  })

  app.use('/corn', cornRouter)

  return app
}

const app = createApp()

export { createApp }

export default app
