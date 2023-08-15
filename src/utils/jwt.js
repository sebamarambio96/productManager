import jwt from "jsonwebtoken";
import { SECRET } from "../config/env.config.js";
import { ErrorInvalidJWT } from "../models/errors/invalidJWT.js";

export function encryptJWT(user) {
    const token = jwt.sign(user, SECRET, { expiresIn: 84600 });
    return token;
}

export async function decryptJWT(token) {
    try {
        const data = await jwt.verify(token, SECRET);
        return data;
    } catch (error) {
        throw new ErrorInvalidJWT("Código invalido");
    }
}

export function tokenExtraction(req, res, next) {
    req["accessToken"] = req.signedCookies["authorization"];
    next(error);
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
        next(error);
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
    next(error);
}

export function onlyRol(rol) {
    return function (req, res, next) {
        if (req.user?.rol === rol) return next(error);
        return next(new Error("Error de permisos"));
    };
}
