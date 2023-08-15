import { ErrorInvalidArgument } from "../models/errors/invalidArgument.js";
import { ErrorLoginFailed } from "../models/errors/loginFailed.js";
import { ErrorNotFound } from "../models/errors/notFound.js";
import { ErrorInvalidJWT } from "../models/errors/invalidJWT.js";

export function errorHandler(error, req, res, next) {
    switch (true) {
        case error instanceof ErrorInvalidArgument:
            res.status(400).json({
                type: error.type,
                description: error.description,
            });
            break;
        case error instanceof ErrorNotFound:
            res.status(404).json({
                type: error.type,
                description: error.description,
            });
            break;
        case error instanceof ErrorLoginFailed:
            res.status(401).json({
                type: error.type,
                description: error.description,
            });
            break;
        case error instanceof ErrorInvalidJWT:
            res.status(401).json({
                type: error.type,
                description: error.description,
            });
            break;
        case error.message === "ID no existe":
            res.status(404).json({ message: error.message });
            break;
        case error.message === "El codigo ingresado ya existe":
            res.status(400).json({ message: error.message });
            break;
        case error.message === "Login Failed":
        case error.message === "Error de autenticacion":
            res.status(401).json({ message: error.message });
            break;
        case error.message === "Error de permisos":
            res.status(403).json({ message: error.message });
            break;
        default:
            res.status(500).json({ message: error.message });
    }
}
