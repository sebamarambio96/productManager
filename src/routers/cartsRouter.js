import { Router } from "express"
import { getCart, addCart, addProducts } from "../controllers/cartsController.js"

export const cartsRouter = Router()

//GET cart by id
cartsRouter.get('/:cid', getCart)

//GET cart by id
cartsRouter.post('/', addCart)

//GET profile
cartsRouter.post('/:cid/product/:pid', addProducts)