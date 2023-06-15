import { ErrorNotFound } from "../errors/notFound.js"

export function notEmpty(value) {
    if (!value) throw new ErrorNotFound('El dato no puede ser vacio')
    if (value === '') throw new ErrorNotFound('El dato no puede ser vacio')
    return value
}