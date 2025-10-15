import { Request, Response } from 'express'
import { buyCorn } from '@/controllers/cornController'

describe('CornController', () => {
  describe('#buyCorn', () => {
    it('should buy corn', () => {
      const req = {} as Request
      const res = {
        send: jest.fn(),
      } as unknown as Response

      buyCorn(req, res)

      expect(res.send).toHaveBeenCalledWith({
        message: '1 Corn has been bought',
      })
    })
  })
})
