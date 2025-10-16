import app from './app'
import { createLogger } from '@bobs-corn/logger'

const PORT = process.env.PORT || 3000

const logger = createLogger()

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
