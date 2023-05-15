import { Router } from "express"
import { deleteCookie, getCookies, login, logout, register, session, setCookie } from "../controllers/profileControllers.js"
import passport from "passport"
import { autenticacionPorGithub, autenticacionPorGithub_CB } from "../config/passport.config.js"

export const profileRouter = Router()

//SET Cookie
profileRouter.get('/setCookie', setCookie)

//GET Cookies
profileRouter.get('/getCookies', getCookies)

//Session test
profileRouter.get('/session', session)

//autentificacion github
profileRouter.get('/github', autenticacionPorGithub, (req, res) => { })
profileRouter.get('/sessionGitHub', autenticacionPorGithub_CB, (req, res, next) => {
    console.log(req.user)
    req.session.admin = false
    req.session.user = req.user.user
    res.redirect('/products')
})

//Logout
profileRouter.get('/logout', logout)

//login
profileRouter.post('/login', passport.authenticate('login'), login)

//Register
profileRouter.post('/register', passport.authenticate('register'), register)

//DESTROY cookie
profileRouter.get('/deleteCookie', deleteCookie)

//DELETE product
profileRouter.get('/loginJWT', deleteCookie)