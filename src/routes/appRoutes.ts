import { Router } from 'express'
import { healthCheck } from '../controllers/healthController'

const router: Router = Router()

router.post('/health', healthCheck)

export default router
