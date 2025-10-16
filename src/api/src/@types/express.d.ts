import { AppService } from '../services/appService'
import { CornService } from '../services/cornService'

declare global {
  namespace Express {
    interface Locals {
      services: {
        getAppService: () => AppService
        getCornService: () => CornService
      }
    }
    interface Request {
      locals: Locals
    }
  }
}

export {}
