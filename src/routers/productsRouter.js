import { Router } from "express"
import { getProducts, getProduct, addProduct , putProduct, deleteProduct} from "../controllers/productsControllerFs.js"

export const productsRouter = Router()

//GET products
productsRouter.get('/', getProducts)

//GET product by id
productsRouter.get('/:pid', getProduct)

//ADD new product
productsRouter.post('/', addProduct)

//UPDATE product info
productsRouter.put('/:pid', putProduct)

//DELETE product
productsRouter.delete('/:pid', deleteProduct)
