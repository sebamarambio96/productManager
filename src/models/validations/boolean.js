import { ErrorInvalidArgument } from "../errors/InvalidArgument.js"

export function isBoolean(valor) {
    if (typeof valor !== 'boolean')
      throw new ErrorInvalidArgument(`El dato debe ser de tipo boolean`)
    return valor
  }