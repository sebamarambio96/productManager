import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaProducts = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: 'Otros' },
    price: { type: Number, required: true },
    thumbnail: { type: Array },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    owner: { type: String, required: true },
}, { versionKey: false })

schemaProducts.plugin(mongoosePaginate)

const modelProducts = mongoose.model('products', schemaProducts)

export const productsDaoMoongose = new DaoMongoose(modelProducts)

export class ProductsManager {
    #productsDb
    constructor() {
        this.#productsDb = modelProducts
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
    async getPaginate(category, options) {

        const data = await this.#productsDb.paginate(category, options)
        /* await this.#productsDb.aggregate([
            { $match: category},
            { $sort: sort },
        ]) */
        return data
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

/* const products = await productsManager.getAll()

console.log(products); */