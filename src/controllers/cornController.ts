import { Request, Response } from 'express'

const buyCorn = (req: Request, res: Response) => {
  console.log('Buying corn')

  res.send('1 Corn has been bought')
}

export { buyCorn }
