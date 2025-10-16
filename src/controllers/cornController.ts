import { Request, Response } from 'express'
import createLogger from '@/libs/logger'
const logger = createLogger('corn-controller')

const buyCorn = async (req: Request, res: Response) => {
  logger.info('Buying corn')

  const cornService = req.locals.services.getCornService()

  const response = await cornService.purchase()

  res.send(response)
}

export { buyCorn }
