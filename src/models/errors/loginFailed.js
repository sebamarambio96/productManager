export class ErrorLoginFailed extends Error {
    constructor(description) {
        super("Error al loguear");
        this.description = description;
        this.type = "Error al loguear";
    }
}
