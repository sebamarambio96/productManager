import { productsRepository } from "../repositories/products.repository.js"

export class ProductsService {
    constructor(productsRepository) {
        this.repo = productsRepository
    }
    async verifyStock(productData) {
        const newProduct = await this.repo.create(productData)
        return productData
    }
}

export const productsService = new ProductsService(productsRepository)

