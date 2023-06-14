export class Users {
    #first_name
    #last_name
    #age
    #cart
    #role
    #user
    #pass

    constructor({ first_name, last_name, age, cart, role, user, pass }) {
        this.#first_name = first_name
        this.#last_name = last_name
        this.#age = age
        this.#cart = cart
        this.#role = role
        this.#user = user
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