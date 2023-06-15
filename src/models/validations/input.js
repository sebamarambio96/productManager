import { InvalidArgument } from "../errors/invalidArgument.js"

export function notEmpty(value) {
    if (!value) throw new InvalidArgument('El dato no puede ser vacio')
    if (value === '') throw new InvalidArgument('El dato no puede ser vacio')
    return value
}