import { ErrorInvalidArgument } from "../errors/InvalidArgument.js"

export function notEmpty(value) {
    if (!value) throw new Error('El dato no puede ser vacio')
    if (value === '') throw new Error('El dato no puede ser vacio')
    return value
}