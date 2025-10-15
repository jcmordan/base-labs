import { Request, Response } from 'express'
import createLogger from '@/libs/logger'
const logger = createLogger('corn-controller')

const buyCorn = (_req: Request, res: Response) => {
  logger.info('Buying corn')

  res.send({
    message: '1 Corn has been bought',
    corn: '🌽',
    timestamp: new Date().toISOString(),
  })
}

export { buyCorn }
