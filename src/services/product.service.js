import { ProductsManager, productsManager } from "../dao/productsShema.js"

export class ProductService {
    constructor(productsRepository) {
        this.repo = productsRepository
    }
    async addProduct(productData) {
        const newProduct = await this.repo.create(productData)
        return productData
    }
}
