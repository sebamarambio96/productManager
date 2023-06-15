export class ErrorInvalidArgument extends Error {
    constructor({description}) {
        this.description = description
        this.type = 'Argumento inválido'
}}