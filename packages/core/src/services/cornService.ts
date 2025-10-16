import { createLogger } from '@bobs-corn/logger'
import { PurchaseResponse } from '@/entities/corn'

export interface CornService {
  purchase: () => Promise<PurchaseResponse>
}

export const buildCornService = (): CornService => {
  const logger = createLogger('corn-service')

  const purchase = async (): Promise<PurchaseResponse> => {
    logger.info('Buying corn')

    return {
      message: '1 Corn has been bought',
      corn: '🌽',
      timestamp: new Date().toISOString(),
    }
  }

  return {
    purchase,
  }
}
