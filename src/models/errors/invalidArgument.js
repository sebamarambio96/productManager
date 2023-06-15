export class ErrorInvalidArgument extends Error {
    constructor(description) {
        super('Argumento inválido')
        this.description = description
        this.type = 'Argumento inválido'
}}