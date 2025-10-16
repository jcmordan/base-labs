import { buildCornService } from '@/services/cornService'

describe('CornService', () => {
  describe('#purchase',  () => {
    it('should buy corn', async () => {
      const cornService = buildCornService()    

      const result = await cornService.purchase()
      expect(result).toMatchObject({
        message: '1 Corn has been bought',
        corn: '🌽',
        timestamp: expect.any(String),
      })
    })
  })
})