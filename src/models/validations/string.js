import { ErrorInvalidArgument } from "../errors/invalidArgument.js";
import { notEmpty } from "./input.js";

export function validateString(value, required = true, onlyAlphab = false) {
    isString(value);
    if (required) notEmpty(value);
    if (onlyAlphab) notEmpty(value);
    return value;
}

export function onlyAlphabetical(value) {
    if (!/[a-zA-Z]+/.test(value)) throw new ErrorInvalidArgument("El dato solo puede tener letras");
    return value;
}

export function isString(value) {
    if (typeof value !== "string") throw new ErrorInvalidArgument(`El dato debe ser de tipo string`);
    return value;
}
