export type Environment = 'development' | 'production' | 'test' | string
export type Health = {
  status: 'OK' | 'ERROR'
  environment: Environment
  timestamp: string
  uptime: number
}

export interface AppService {
  getHealthCheck: () => Promise<Health>
}

export const buildAppService = (): AppService => {
  const getHealthCheck = async (): Promise<Health> => {
    return {
      status: 'OK',
      environment: process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  }
  return {
    getHealthCheck,
  }
}
