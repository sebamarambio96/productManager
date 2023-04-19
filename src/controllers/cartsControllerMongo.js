import { cartsManager } from "../dao/models/cartsShema.js"

//GET one product by ID
export async function getCart(req, res, next) {
    try {
        const { cid } = req.params
        const cart = await cartsManager.getByID(cid)
        if (!cart) throw new Error('ID no existe')
        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
}

//ADD new cart
export async function addCart(req, res, next) {
    try {
        const cart = await cartsManager.addCart()
        console.log(cart)
        res.status(201).json({ cart })
    } catch (error) {
        next(error)
    }
}

//ADD products
export async function addProducts(req, res, next) {
    try {
        await cartsManager.addProducts(req.params.cid, req.params.pid)
        res.status(201).json({ message: 'Producto actualizado/agregado' })
    } catch (error) {
        next(error)
    }
}