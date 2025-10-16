import { NextFunction, Request, Response } from 'express'

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.locals
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}
