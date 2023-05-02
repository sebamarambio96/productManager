import { Router } from "express"
import { deleteCookie, getCookies, login, logout, register, session, setCookie } from "../controllers/profileControllers.js"
import passport from "passport"

export const profileRouter = Router()

//SET Cookie
profileRouter.get('/setCookie', setCookie)

//GET Cookies
profileRouter.get('/getCookies', getCookies)

//Session test
profileRouter.get('/session', session)

//Session test
profileRouter.post('/sessionGitHub',passport.authenticate('github'), session)

//Logout
profileRouter.get('/logout', logout)

//login
profileRouter.post('/login', passport.authenticate('login'), login)

//Register
profileRouter.post('/register', passport.authenticate('register'), register)

//DELETE product
profileRouter.get('/deleteCookie', deleteCookie)
