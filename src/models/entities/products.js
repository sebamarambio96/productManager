import { validateNum } from "../validations/number.js"
import { validateString } from "../validations/string.js"

export class Products {
    #tittle
    #description
    #price
    #thumbnail
    #code
    #stock
    #category

    constructor({ tittle, description, price, thumbnail, code, stock, category }) {
        this.#tittle = validateString(tittle)
        this.#description = validateString(description)
        this.#price = validateNum(price)
        this.#thumbnail = thumbnail
        this.#code = validateString(code)
        this.#stock = stock
        this.#category = category
    }

    get tittle() { return this.#tittle }
    get description() { return this.#description }
    get price() { return this.#price }
    get thumbnail() { return this.#thumbnail }
    get code() { return this.#code }
    get stock() { return this.#stock }
    get category() { return this.#category }

    dto() {
        return {
            tittle: this.#tittle,
            description: this.#description,
            price: this.#price,
            thumbnail: this.#thumbnail,
            code: this.#code,
            stock: this.#stock,
            category: this.#category,
        }
    }
}