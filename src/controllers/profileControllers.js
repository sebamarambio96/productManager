import { Users } from "../models/entities/users.js";
import { decryptJWT, encryptJWT } from "../utils/jwt.js";
import { Logger } from "../utils/winston.js";

//SET cookie
export async function setCookie(req, res, next) {
    try {
        res.cookie("CoderCookie", "data", { maxAge: 1000000000 }).send({
            status: "success",
            message: "cookie set",
        });
    } catch (error) {
        next(error);
    }
}

//GET cookies
export async function getCookies(req, res, next) {
    try {
        res.send(req.cookies);
    } catch (error) {
        next(error);
    }
}
//DELETE cookie
export async function deleteCookie(req, res, next) {
    try {
        res.clearCookie("CoderCookie").send("Cookie Removed");
    } catch (error) {
        next(error);
    }
}
//LOGOUT
export async function logout(req, res, next) {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.json({ status: "Logout ERROR", body: err });
            } else {
                res.status(201).json({ message: "Logout OK" });
            }
        });
    } catch (error) {
        next(error);
    }
}
//Session test
export async function session(req, res, next) {
    try {
        console.log(req.session);
        if (req.session.user) {
            res.status(201).json({ auth: true, info: req.session });
        } else {
            res.status(201).json({ auth: false });
        }
    } catch (error) {
        next(error);
    }
}

//current
export async function currentMiddleware(req, res, next) {
    try {
        Logger.silly(req.session.passport.user);
        const user = new Users(req.session.passport.user);
        req.session.user = user.dtoSafe();
        //Validate token
        decryptJWT(req.cookies.accessToken);
        if (user.role === "admin") {
            req.session.admin = true;
        } else {
            req.session.admin = false;
        }
        next();
    } catch (error) {
        next(error);
    }
}

//current
export async function current(req, res, next) {
    try {
        Logger.silly(req.session.passport.user);
        const user = new Users(req.session.passport.user);
        req.session.user = user.dtoSafe();
        //Validate token
        decryptJWT(req.cookies.accessToken);
        if (user.role === "admin") {
            req.session.admin = true;
            res.status(200).json(user.dtoSafe());
        } else {
            req.session.admin = false;
            res.status(200).json(user.dtoSafe());
        }
    } catch (error) {
        next(error);
    }
}

//login
export async function login(req, res, next) {
    try {
        Logger.http(req.session.passport.user);
        const { _id } = req.session.passport.user;
        const user = new Users(req.session.passport.user);
        const userData = user.dtoSafe();
        req.session.user = userData;
        //Generate token

        Logger.silly(_id);
        const jwt = encryptJWT({ id: _id });
        Logger.silly(jwt);

        if (user.role === "admin") {
            req.session.admin = true;
            res.cookie("accessToken", jwt, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
            }).send({
                status: "success",
                message: "cookie set",
            });
        } else {
            req.session.admin = false;
            res.cookie("accessToken", jwt, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
            }).send({
                status: "success",
                message: "cookie set",
            });
        }
    } catch (error) {
        Logger.error(error);
        next(error);
    }
}

//Register
export async function register(req, res, next) {
    try {
        res.status(201).json({ message: "Usuario registrado" });
    } catch (error) {
        next(error);
    }
}
