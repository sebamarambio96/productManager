import { ErrorInvalidArgument } from "../models/errors/InvalidArgument.js"
import { ErrorNotFound } from "../models/errors/notFound.js"

export function errorHandler(error, req, res, next) {
    switch (error.message) {
        case error instanceof ErrorInvalidArgument:
            res.status(400)
            res.json({
                type: error.type,
                description: error.description
            })
            break
        case error instanceof ErrorNotFound:
            res.status(400)
            res.json({
                type: error.type,
                description: error.description
            })
            break
        case 'ID no existe':
            res.status(404)
            break
        case 'El codigo ingresado ya existe':
            res.status(400)
            break
        case 'Login Failed':
            res.status(401)
            break
        case 'Error de autenticacion':
            res.status(401)
            break
        case 'Error de permisos':
            res.status(403)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message, description: error.description })
}