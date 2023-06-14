export class InvalidArgument extends Error {
    constructor({description}) {
        super('INVALID ARGUMENT')
        this.description = description
}}