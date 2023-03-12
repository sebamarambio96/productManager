import { CartManager } from "./managers/cartManager.js"
import { productManager } from "./productsController.js"
const cartManager = new CartManager('./src/data/carts.json', productManager)

//GET one product by ID
export async function getCart(req, res, next) {
    try {
        const { cid } = req.params
        const cart = await cartManager.getCartById(cid)
        if (!cart) throw new Error('ID no existe')
        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
}

//ADD new cart
export async function addCart(req, res, next) {
    try {
        await cartManager.addCart()
        res.status(201).json({ message: 'Carrito vacío creado' })
    } catch (error) {
        next(error)
    }
}

//ADD products
export async function addProducts(req, res, next) {
    try {
        await cartManager.addProducts(req.params.cid, req.params.pid)
        res.status(201).json({ message: 'Producto actualizado/agregado' })
    } catch (error) {
        next(error)
    }
}