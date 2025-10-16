import { Request, Response } from 'express'

const healthCheck = async (req: Request, res: Response) => {
  const cornService = req.locals.services.getAppService()

  const response = await cornService.getHealthCheck()

  res.send(response)
}

export { healthCheck }
