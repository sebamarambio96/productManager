import { productsRepository } from "../repositories/products.repository.js";

export class ProductsService {
    constructor(productsRepository) {
        this.repo = productsRepository;
    }
}

export const productsService = new ProductsService(productsRepository);
