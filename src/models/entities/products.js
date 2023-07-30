import { validateNum } from "../validations/number.js"
import { validateString } from "../validations/string.js"

export class Products {
    #title
    #description
    #price
    #thumbnail
    #code
    #stock
    #category
    #owner

    constructor({ title, description, price, thumbnail, code, stock, category, owner }) {
        this.#title = validateString(title)
        this.#description = validateString(description)
        this.#price = validateNum(price)
        this.#thumbnail = thumbnail
        this.#code = validateString(code)
        this.#stock = stock
        this.#category = category
        this.#owner = owner
    }

    get title() { return this.#title }
    get description() { return this.#description }
    get price() { return this.#price }
    get thumbnail() { return this.#thumbnail }
    get code() { return this.#code }
    get stock() { return this.#stock }
    get category() { return this.#category }

    dto() {
        return {
            title: this.#title,
            description: this.#description,
            price: this.#price,
            thumbnail: this.#thumbnail,
            code: this.#code,
            stock: this.#stock,
            category: this.#category,
            owner: this.#owner,
        }
    }
}