interface Config {
  port: number
  rateLimit: {
    windowMs: number
    max: number
  }
  jwt: {
    secret: string
    expiresIn: string
  }
  webUrl: string
}
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute
const DEFAULT_MAX = 1 // limit each IP to 1 request per minute

export const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS
      ? parseInt(process.env.RATE_LIMIT_WINDOW_MS)
      : RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX
      ? parseInt(process.env.RATE_LIMIT_MAX)
      : DEFAULT_MAX,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  },
  webUrl: process.env.WEB_URL ?? 'http://localhost:5173',
}