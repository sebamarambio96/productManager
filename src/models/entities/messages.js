import { notEmpty } from "../validations/input.js"

export class Messages {
    #user
    #message

    constructor({ user, message }) {
        this.#user = user
        this.#message = message
    }

    get user() { return this.#user }
    get message() { return this.#message }

    dto() {
        return {
            user: notEmpty(this.#user),
            message: notEmpty(this.#message),
        }
    }
}