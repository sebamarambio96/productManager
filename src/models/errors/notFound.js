export class ErrorNotFound extends Error {
    constructor(description) {
        super('Argumento no encontrado')
        this.description = description
        this.type = 'Argumento no encontrado'
}}