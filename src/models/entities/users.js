import { notEmpty } from "../validations/input"
import { validateNum } from "../validations/number"
import { validateString } from "../validations/string"

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