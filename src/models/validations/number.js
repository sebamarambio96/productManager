import { InvalidArgument } from "../errors/invalidArgument.js"
import { notEmpty } from "./input.js"

export function validateNum(value, required = true, positive = true) {
    isInteger(value)
    isNumber(value)
    if (required) notEmpty(value)
    if (positive) isPositive(value)
    return value
}

export function isInteger(value) {
    if (!Number.isInteger(value)) throw new InvalidArgument('El dato debe ser entero')
    return value
}
export function isPositive(value) {
    if (Number(value) < 0) throw new InvalidArgument('El dato debe ser positivo')
    return value
}

export function isNumber(value) {
    if (typeof valor !== 'number') throw new InvalidArgument(`El dato debe ser un número`)
    return value
}