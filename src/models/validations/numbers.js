import { InvalidArgument } from "../errors/invalidArgument.js"

export function isInteger(value) {
    if (!Number.isInteger(value)) throw new InvalidArgument('El dato debe ser entero')
    return value
}
export function isPositive(value) {
    if (Number(value) < 0) throw new InvalidArgument('El dato debe ser positivo')
    return value
}