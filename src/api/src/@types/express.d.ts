import { AppService } from '../services/appService'
import { CornService, UserService } from '@bobs-corn/core'

declare global {
  namespace Express {
    interface Locals {
      services: {
        getAppService: () => AppService
        getCornService: () => CornService
        getUserService: () => UserService
      }
    }
    interface Request {
      locals: Locals
    }
  }
}

export {}
