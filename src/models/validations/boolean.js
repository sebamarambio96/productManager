import { ErrorInvalidArgument } from "../errors/invalidArgument.js";

export function validateBoolean(value, required = true) {
    isBoolean(value);
    if (required) notEmpty(value);
    return value;
}

export function isBoolean(value) {
    if (typeof value !== "boolean") throw new ErrorInvalidArgument(`El dato debe ser de tipo boolean`);
    return value;
}
