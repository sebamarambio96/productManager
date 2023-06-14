import { Router } from "express"
import { mocking100Products } from "../test/product.test.js"

export const testRouter = Router()

//GET cart by id
testRouter.post('/mockingproducts', mocking100Products)
