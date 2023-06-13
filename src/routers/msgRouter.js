import { Router } from "express"
import { sendMail } from "../controllers/msgController.js"

export const messagesRouter = Router()

//GET cart by id
messagesRouter.post('/sendMail', sendMail)
