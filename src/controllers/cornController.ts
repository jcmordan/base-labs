import { Request, Response } from 'express'

const buyCorn = (_req: Request, res: Response) => {
  res.send({
    message: '1 Corn has been bought',
    corn: '🌽',
    timestamp: new Date().toISOString(),
  })
}

export { buyCorn }
