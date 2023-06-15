import { cartsRepository } from "../repositories/carts.repository.js"

export class CartsService {
    constructor(cartsRepository) {
        this.repo = cartsRepository
    }
}

export const cartsService = new CartsService(cartsRepository)