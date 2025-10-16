import { createUser } from "@/controllers/userController"
import { validate } from "@/middlewares/validate"
import { userSchema } from "@bobs-corn/validations"
import { Router } from "express"

const router: Router = Router()

const createUserSchema = userSchema.omit({ id: true }).strict()

router.post('/', validate(createUserSchema), createUser)

export default router