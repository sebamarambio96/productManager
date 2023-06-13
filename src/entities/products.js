function notEmpty(value) {
    if (!value) throw new Error('el dato no puede ser vacio')
    return value
  }
  
  function soloAlfabetico(value) {
    if (!/[a-zA-Z]+/.test(value)) throw new Error('el dato solo puede tener letras')
    return value
  }
  
  function entero(value) {
    if (!Number.isInteger(value)) throw new Error('el dato debe ser entero')
    return value
  }
  
  function positivo(value) {
    if (Number(value) < 0) throw new Error('el dato debe ser positivo')
    return value
  }

export class Products {
    #tittle
    #description
    #price
    #thumbnail
    #code
    #stock
    #category

    constructor({ tittle, description, price, thumbnail, code, stock, category }) {
        this.#tittle = tittle
        this.#description = notEmpty(description)
        this.#price = positivo(entero(price))
        this.#thumbnail = thumbnail
        this.#code = code
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