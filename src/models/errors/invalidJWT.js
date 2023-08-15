export class ErrorInvalidJWT extends Error {
    constructor(description) {
        super("Error JWT");
        this.description = description;
        this.type = "Error JWT";
    }
}
