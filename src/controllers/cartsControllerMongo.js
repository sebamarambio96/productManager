import { cartsManager } from "../dao/cartsShema.js"
import { cartsRepository } from "../repositories/carts.repository.js"
import { productsRepository } from "../repositories/products.repository.js"

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

//Delete products
export async function deleteProduct(req, res, next) {
    try {
        await cartsManager.deleteProduct(req.params.cid, req.params.pid)
        res.status(201).json({ message: 'Producto eliminado' })
    } catch (error) {
        next(error)
    }
}

//Purchase
export async function purchase(req, res, next) {
    try {
        const cid = req.params.cid
        const products = await productsRepository.readMany()
        const cart = await cartsRepository.readOne({_id: cid})
        res.status(201).json(cart)
    } catch (error) {
        next(error)
    }
}