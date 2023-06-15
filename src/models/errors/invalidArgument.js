export class InvalidArgument extends Error {
    constructor({description}) {
        this.description = description
        this.type = 'Argumento invalido'
}}