import mongoose, { Schema } from "mongoose";
import { productsManager } from "./productsShema.js";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaCarts = new mongoose.Schema({
    cartProducts: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: { type: Number, default: 0 }
            }
        ],
        default: []
    }
}, { versionKey: false })

const modelCarts = mongoose.model('carts', schemaCarts)

export const cartsDaoMoongose = new DaoMongoose(modelCarts)
 
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
        await this.#cartsDb.findOneAndUpdate({ _id: cid }, { cartProducts: cart.cartProducts })
        console.log('Producto actualizado/agregado')
    }
    async addCart() {
        const newCart = await this.#cartsDb.create({ cartProducts: [] })
        console.log(newCart)
        /*         //Nuevo carrito
                await io.on('connection', async clientSocket => {
                    clientSocket.emit('newCart', newCart)
                }) */
        return newCart
    }
    async getAll() {
        const allCarts = await this.#cartsDb.find({}).lean()
        return allCarts
    }
    async getByID(id) {
        const cart = await this.#cartsDb.findById({ _id: id }).populate('cartProducts.product').lean()
        console.log(cart)
        return cart
    }
    async deleteProduct(cid, pid) {
        const arrayCarts = await this.getAll()
        let cart = arrayCarts.filter(item => item._id == cid)
        cart = cart[0]
        let updateCart = cart.cartProducts.filter(item => item.product._id != pid)
        console.log(updateCart)
        await this.#cartsDb.findOneAndUpdate({ _id: cid }, { cartProducts: updateCart })
        return cart
    }
}

export const cartsManager = new CartsManager()