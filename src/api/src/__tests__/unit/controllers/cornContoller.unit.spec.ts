import { Request, Response } from 'express'
import { buyCorn } from '@/controllers/cornController'

const infoMock = jest.fn()

jest.mock('@bobs-corn/logger', () => ({
  __esModule: true,
  createLogger: jest.fn(() => ({
    info: (...args: unknown[]) => infoMock(...args),
  })),
}))

describe('CornController', () => {
  const cornService = {
    purchase: jest.fn(() => ({
      message: '1 Corn has been bought',
      corn: '🌽',
      timestamp: new Date().toISOString(),
    })),
  }

  describe('#buyCorn', () => {
    it('should buy corn', async () => {
      const req = {
        locals: {
          services: {
            getCornService: jest.fn(() => cornService),
          },
        },
      } as unknown as Request

      const res = {
        send: jest.fn(),
      } as unknown as Response

      await buyCorn(req, res)

      expect(infoMock).toHaveBeenCalledWith('Buying corn')
      expect(cornService.purchase).toHaveBeenCalled()

      expect(res.send).toHaveBeenCalledWith({
        message: '1 Corn has been bought',
        corn: '🌽',
        timestamp: expect.any(String),
      })
    })
  })
})
