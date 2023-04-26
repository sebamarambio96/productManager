import { Router } from "express"
import { deleteCookie, getCookies, login, logout, register, session, setCookie } from "../controllers/loginControllers.js"

export const loginRouter = Router()

//SET Cookie
loginRouter.get('/setCookie', setCookie)

//GET Cookies
loginRouter.get('/getCookies', getCookies)

//Session test
loginRouter.get('/session', session)

//Logout
loginRouter.get('/logout', logout)

//login
loginRouter.post('/login', login)

//Register
loginRouter.post('/register', register)

//DELETE product
loginRouter.get('/deleteCookie', deleteCookie)
