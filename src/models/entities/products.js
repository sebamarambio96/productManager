import { isInteger, isPositive } from "../validations/numbers.js"
import { notEmpty } from "../validations/input.js"

export class Products {
    #tittle
    #description
    #price
    #thumbnail
    #code
    #stock
    #category

    constructor({ tittle, description, price, thumbnail, code, stock, category }) {
        this.#tittle = notEmpty(tittle)
        this.#description = notEmpty(description)
        this.#price = isPositive(isInteger(price))
        this.#thumbnail = thumbnail
        this.#code = notEmpty(code)
        this.#stock = notEmpty(stock)
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