import { createLogger } from '../logger'

describe('Logger', () => {
  it('should create a logger', () => {
    const logger = createLogger('test')
    
    expect(logger).toBeDefined()
    expect(logger.log).toBeDefined()
    expect(logger.info).toBeDefined()
    expect(logger.warn).toBeDefined()
    expect(logger.error).toBeDefined()
  })
})