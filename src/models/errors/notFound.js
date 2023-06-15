export class ErrorNotFound extends Error {
    constructor({description}) {
        this.description = description
        this.type = 'Argumento no encontrado'
}}