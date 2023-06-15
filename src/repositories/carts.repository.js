import { GenericRepository } from "./GenericRepository.js";
import { cartsDaoMoongose } from "../dao/cartsShema.js";

class CartsRepository extends GenericRepository {
    constructor(dao) {
        super(dao)
    }
}

export const cartsRepository = new CartsRepository(cartsDaoMoongose)