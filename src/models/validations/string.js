import { InvalidArgument } from "../errors/invalidArgument.js"

  export function onlyAlphabetical(value) {
    if (!/[a-zA-Z]+/.test(value)) throw new InvalidArgument('El dato solo puede tener letras')
    return value
  }
