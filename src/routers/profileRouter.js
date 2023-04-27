import { Router } from "express"
import { deleteCookie, getCookies, login, logout, register, session, setCookie } from "../controllers/profileControllers.js"

export const profileRouter = Router()

//SET Cookie
profileRouter.get('/setCookie', setCookie)

//GET Cookies
profileRouter.get('/getCookies', getCookies)

//Session test
profileRouter.get('/session', session)

//Logout
profileRouter.get('/logout', logout)

//login
profileRouter.post('/login', login)

//Register
profileRouter.post('/register', register)

//DELETE product
profileRouter.get('/deleteCookie', deleteCookie)
