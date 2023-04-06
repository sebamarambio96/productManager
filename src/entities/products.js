export class Products {
    #tittle
    #description
    #price
    #thumbnail
    #code
    #stock

    constructor({ tittle, description, price, thumbnail, code, stock }) {
        this.#tittle = tittle
        this.#description = description
        this.#price = price
        this.#thumbnail = thumbnail
        this.#code = code
        this.#stock = stock
    }

    get tittle() { return this.#tittle }
    get description() { return this.#description }
    get price() { return this.#price }
    get thumbnail() { return this.#thumbnail }
    get code() { return this.#code }
    get stock() { return this.#stock }

    data() {
        return {
            tittle: this.#tittle,
            description: this.#description,
            price: this.#price,
            thumbnail: this.#thumbnail,
            code: this.#code,
            stock: this.#stock,
        }
    }
}