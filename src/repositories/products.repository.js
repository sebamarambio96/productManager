import { GenericRepository } from "./GenericRepository.js";
import { productsDaoMoongose } from "../dao/productsShema.js";


class ProductsRepository extends GenericRepository {
    constructor(dao) {
        super(dao)
    }
}

export const productsRepository = new ProductsRepository(productsDaoMoongose)