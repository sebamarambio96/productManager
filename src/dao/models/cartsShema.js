import mongoose from "mongoose";
import { productsManager } from "./productsShema.js";
import { io } from "../../main.js";

const schemaCarts = new mongoose.Schema({
    products: { type: Object, required: true }
}, { versionKey: false })

class CartsManager {
    #cartsDb
    constructor() {
        this.#cartsDb = mongoose.model('carts', schemaCarts)
    }
    async addProducts(cid, pid) {
        const arrayCarts = await this.getAll()
        const arrayProducts = await productsManager.getAll()
        const productVerify = arrayProducts.filter(item => item._id == pid)
        // VERIFY EXISTENCE of product
        if (productVerify.length === 0) throw new Error('ID no existe')
        console.log('first')
        let cart = arrayCarts.filter(item => item._id == cid)
        cart = cart[0]
        // VERIFY EXISTENCE of cart
        if (cart.length === 0) throw new Error('ID no existe')
        let product = cart.products.find(item => item.pid == pid)
        console.log(product)
        //Cart index
        if (!product) {
            console.log('asdfasdfasdf')
            cart.products.push({ pid: pid, quantity: 1 })
            /* console.log(cart.products) */
        } else {
            //Product index in products array
            const pidx = cart.products.indexOf(product)
            cart.products[pidx].quantity += 1
            console.log(cart.products[pidx].quantity)
        }
        await this.#cartsDb.findOneAndUpdate({ _id: cid }, { products: cart.products }).lean()
        console.log('Producto actualizado/agregado')
    }
    async addCart() {
        const newCart = await this.#cartsDb.create({ products: [] })
        //Nuevo carrito
        await io.on('connection', async clientSocket => {
            clientSocket.emit('newCart', newCart)
        })
        return newCart
    }
    async getAll() {
        const allCarts = await this.#cartsDb.find({}).lean()
        return allCarts
    }
    async getByID(id) {
        const cart = await this.#cartsDb.findById(id).lean()
        return cart
    }
}

export const cartsManager = new CartsManager()