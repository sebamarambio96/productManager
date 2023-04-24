import { Router } from "express"
import { getCart, addCart, addProducts, deleteProduct } from "../controllers/cartsControllerMongo.js"

export const cartsRouter = Router()

//GET cart by id
cartsRouter.get('/:cid', getCart)

//Create cart
cartsRouter.post('/', addCart)

//Add product
cartsRouter.post('/:cid/product/:pid', addProducts)

//Delete product
cartsRouter.delete('/:cid/product/:pid', deleteProduct)