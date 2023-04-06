export class Messages {
    #user
    #message

    constructor({ user, message }) {
        this.#user = user
        this.#message = message
    }

    get user() { return this.#user }
    get message() { return this.#message }

    data() {
        return {
            user: this.#user,
            message: this.#message,
        }
    }
}