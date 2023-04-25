import { Router } from "express"
import { setCookie } from "../controllers/loginControllers.js"

export const loginRouter = Router()

//SET Cookie
loginRouter.get('/setCookie', setCookie)
/* 
//GET Cookies
loginRouter.get('/getCookies', getCookies)

//DELETE product
loginRouter.delete('/deleteCookie', deleteCookie) */
