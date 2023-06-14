import { Router } from "express"
import { mocking100Products } from "../test/product.test"

export const testRouter = Router()

//GET cart by id
testRouter.post('/mockingproducts', mocking100Products)
