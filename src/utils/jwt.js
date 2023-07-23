import jwt from "jsonwebtoken";
import { SECRET } from "../config/env.config.js";

export function encryptJWT(user) {
    const token = jwt.sign(user, SECRET, { expiresIn: 84600 });
    return token;
}

export function decryptJWT(token) {
    jwt.verify(token, SECRET)
}

export function tokenExtraction(req, res, next) {
    req["accessToken"] = req.signedCookies["authorization"];
    next();
}

export async function auth(req, res, next) {
    if (!req["accessToken"]) {
        return res.status(401).json({
            error: "not authenticated",
        });
    }

    try {
        const decoded = await decrypt(req["accessToken"]);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "not authorized",
        });
    }
}

export function onlyAuth(req, res, next) {
    if (!req["user"]) {
        return res.status(403).json({
            error: "not authorized. only logged in users allowed",
        });
    }
    next();
}

export function onlyRol(rol) {
    return function (req, res, next) {
        if (req.user?.rol === rol) return next();
        return next(new Error("Error de permisos"));
    };
}
