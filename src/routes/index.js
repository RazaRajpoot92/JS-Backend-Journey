import { Router } from "express";
import userRouter from "../routes/userRoutes.js"

const router = Router()

router.use(userRouter)

export default router