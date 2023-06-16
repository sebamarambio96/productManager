import { validateNum } from "../validations/number.js"
import { validateString } from "../validations/string.js"

export class Users {
    #first_name
    #last_name
    #age
    #cart
    #role
    #user
    #pass

    constructor({ first_name, last_name, age, cart, role, user, pass }) {
        this.#first_name = validateString(first_name, true, true)
        this.#last_name = validateString(last_name, true, true)
        this.#age = validateNum(age)
        this.#cart = cart
        this.#role = validateString(role, true, true)
        this.#user = validateString(user,true)
        this.#pass = pass
    }

    get first_name() { return this.#first_name }
    get last_name() { return this.#last_name }
    get age() { return this.#age }
    get cart() { return this.#cart }
    get role() { return this.#role }
    get user() { return this.#user }

    dto() {
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            age: this.#age,
            cart: this.#cart,
            role: this.#role,
            user: this.#user,
            pass: this.#pass,
        }
    }
}