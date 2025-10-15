import express from 'express'
import cornRouter from '@/routes/cornRoutes'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/hello', (_req, res) => {
  res.send('Hello, base-labs!!')
})

app.use('/corn', cornRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
