import { AppService } from '../services/appService'
import { CornService, UserService, User } from '@bobs-corn/core'

declare global {
  namespace Express {
    interface Locals {
      user: User | null
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
