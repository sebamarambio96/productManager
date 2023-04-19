import { Router } from "express"
import { getCart, addCart, addProducts } from "../controllers/cartsControllerMongo.js"

export const cartsRouter = Router()

//GET cart by id
cartsRouter.get('/:cid', getCart)

//GET cart by id
cartsRouter.post('/', addCart)

//Add product
cartsRouter.post('/:cid/product/:pid', addProducts)

//Add product
cartsRouter.post('/:cid/product/:pid', addProducts)