import { Router } from 'express'
import { buyCorn } from '../controllers/cornController'

const router: Router = Router()

router.post('/buy', buyCorn)

export default router
