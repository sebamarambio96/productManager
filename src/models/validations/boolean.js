import { InvalidArgument } from "../errors/invalidArgument.js"

export function isBoolean(valor) {
    if (typeof valor !== 'boolean')
      throw new InvalidArgument(`El dato debe ser de tipo boolean`)
    return valor
  }