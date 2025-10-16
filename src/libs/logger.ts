import { NextFunction, Request, Response } from 'express'
import winston from 'winston'
const { combine, timestamp, printf, colorize, errors, prettyPrint } =
  winston.format

const isDevelopment = process.env.NODE_ENV === 'production'

const consolePrintFormat = printf(
  ({ level, message, timestamp, stack, service, ...meta }) => {
    // Handle error objects properly
    const { environment, ..._meta } = meta

    const metaInfo =
      Object.keys(_meta).length > 0 ? `\n${JSON.stringify(_meta, null, 2)}` : ''

    return `[${environment}] ${timestamp} ${service} ${level} : ${message}${stack ? `\n${stack}` : ''}${metaInfo}`
  },
)

const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  prettyPrint({
    colorize: true, // Also colorize the pretty-printed objects
    depth: 5, // Set the maximum depth to pretty-print
  }),
  consolePrintFormat,
)

const createLogger = (service: string = 'base-labs') => {
  const logger = winston.createLogger({
    level: 'info',
    format: !isDevelopment ? devFormat : winston.format.json(),
    transports: [new winston.transports.Console()],
    defaultMeta: {
      environment: process.env.NODE_ENV || 'development',
      service,
    },
  })

  return logger
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = createLogger()
  const start = Date.now()

  // Log request
  logger.info('Request started', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  })

  res.on('finish', () => {
    const duration = Date.now() - start

    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    })
  })

  next()
}

export default createLogger
