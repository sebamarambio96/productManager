import { Router } from "express";
import { current, deleteCookie, getCookies, login, logout, register, session, setCookie } from "../controllers/profileControllers.js";
import passport from "passport";
import compression from "express-compression";
import { autenticacionPorGithub, autenticacionPorGithub_CB } from "../config/passport.config.js";

export const sessionRouter = Router();

//SET Cookie
sessionRouter.get("/setCookie", setCookie);

//GET Cookies
sessionRouter.get("/getCookies", getCookies);

//Session test
sessionRouter.get("/session", compression(), session);

//autentificacion github
sessionRouter.get("/github", autenticacionPorGithub, (req, res) => {});
sessionRouter.get("/sessionGitHub", autenticacionPorGithub_CB, (req, res, next) => {
    req.session.admin = false;
    req.session.user = req.user.user;
    res.redirect("/products");
});

//Logout
sessionRouter.get("/logout", logout);

//login
sessionRouter.post("/login", passport.authenticate("login"), login);

//Register
sessionRouter.post("/register", passport.authenticate("register"), register);

//DESTROY cookie
sessionRouter.get("/deleteCookie", deleteCookie);

//CURRENT
sessionRouter.get("/current", current);
