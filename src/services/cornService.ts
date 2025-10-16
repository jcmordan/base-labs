import createLogger from '@/libs/logger'

export type PurchaseResponse = {
  message: string
  corn: string
  timestamp: string
}

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
