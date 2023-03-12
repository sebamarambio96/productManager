import fs from "fs/promises"
import { productManager } from "../productsController.js"

export class CartManager {
    constructor(path, products) {
        this.path = path,
            this.products = products
    }
    async getCarts() {
        let data = await fs.readFile(this.path)
        let carts = JSON.parse(data)
        return carts
    }

    async getCartById(id) {
        const arrayCarts = await this.getCarts()
        const cart = arrayCarts.filter(item => item.id === parseInt(id))
        // VERIFY EXISTENCE
        if (cart.length === 0) throw new Error('ID no existe')
        return cart
    }

    async saveCarts(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 4), 'utf8')
    }

    async addCart() {
        const arrayCarts = await this.getCarts()
        const newCart = {
            products: []
        }
        arrayCarts.length === 0 ? newCart.id = 1 : newCart.id = arrayCarts[arrayCarts.length - 1].id + 1
        arrayCarts.push(newCart) |
            await this.saveCarts(arrayCarts)
        console.log('Carrito creado')
    }

    async addProducts(cid, pid) {
        const arrayCarts = await this.getCarts()
        const arrayProducts = await productManager.getProducts()
        const productVerify = arrayProducts.filter(item => item.id === parseInt(pid))
        // VERIFY EXISTENCE of product
        if (productVerify.length === 0) throw new Error('ID no existe')
        let cart = arrayCarts.filter(item => item.id === parseInt(cid))
        cart = cart[0]
        // VERIFY EXISTENCE of cart
        if (cart.length === 0) throw new Error('ID no existe')
        let product = cart.products.find(item => item.pid === parseInt(pid))
        //Cart index
        const cidx = arrayCarts.indexOf(cart)
        if (!product) {
            cart.products.push({ pid: parseInt(pid), quantity: 1 })
        } else {
            //Product index in products array
            const pidx = arrayCarts[cidx].products.indexOf(product)
            cart.products[pidx].quantity += 1
        }
        console.log(arrayCarts)
        arrayCarts[cidx] = cart
        console.log(arrayCarts)
        await this.saveCarts(arrayCarts)
        console.log('Producto actualizado/agregado')
    }
}
