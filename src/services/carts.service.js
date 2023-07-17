import { cartsRepository } from "../repositories/carts.repository.js"
import { productsRepository } from "../repositories/products.repository.js"

export class CartsService {
    constructor(cartsRepository) {
        this.repo = cartsRepository
    }
    async addProducts(cid, pid) {
        const arrayCarts = await this.repo.readMany({_id:cid})
        const arrayProducts = await productsRepository.readMany()
        const productVerify = arrayProducts.filter(item => item._id == pid)
        // VERIFY EXISTENCE of product
        if (productVerify.length === 0) throw new Error('ID no existe')
        /* console.log(arrayProducts) */
        let cart = arrayCarts.filter(item => item._id == cid)
        cart = cart[0]
        // VERIFY EXISTENCE of cart
        if (cart.length === 0) throw new Error('ID no existe')
        let product = cart.cartProducts.find(item => item.product == pid)
        console.log(product)
        //Cart index
        if (!product) {
            /* console.log(cart) */
            cart.cartProducts.push({ product: pid, quantity: 1 })
            console.log(cart.cartProducts)
        } else {
            //Product index in cartProducts array
            const pidx = cart.cartProducts.indexOf(product)
            cart.cartProducts[pidx].quantity += 1
            console.log(cart.cartProducts[pidx].quantity)
        }
        await this.repo.findOneAndUpdate({ _id: cid }, { cartProducts: cart.cartProducts })
        console.log('Producto actualizado/agregado')
    }
}

export const cartsService = new CartsService(cartsRepository)