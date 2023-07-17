import { Router } from "express"
import { passRecovery, sendMail } from "../controllers/msgController.js"

export const messagesRouter = Router()

messagesRouter.post('/sendMail', sendMail)

//Password recovery
messagesRouter.post('/sendMail', passRecovery)

