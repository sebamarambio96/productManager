import mongoose from "mongoose";

const schemaProducts = new mongoose.Schema({
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
}, { versionKey: false })

class ProductsManager {
    #productsDb
    constructor() {
        this.#productsDb = mongoose.model('products', schemaProducts)
    }

    async addProduct(productData) {
        const newProduct = await this.#productsDb.create(productData)
        return newProduct
    }
    async addManyProducts(productsData) {
        const newProducts = await this.#productsDb.insertMany(productsData)
        return newProducts
    }
    async getAll() {
        const allProducts = await this.#productsDb.find({}).lean()
        return allProducts
    }
    async getByID(id) {
        const product = await this.#productsDb.findById(id).lean()
        return product
    }
    async updateByID(id, data) {
        const product = await this.#productsDb.findOneAndUpdate({ _id: id }, data).lean()
        return product
    }
    async deleteByID(id) {
        const product = await this.#productsDb.deleteOne({ _id: id }).lean()
        return product
    }
}

export const productsManager = new ProductsManager()