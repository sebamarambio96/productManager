import { Router } from "express";
import { loggerTest, mocking100Products, winston } from "../../test/product.test.js";

export const testRouter = Router();

//GET cart by id
testRouter.get("/mockingproducts", mocking100Products);

//logger
testRouter.get("/logger", loggerTest);

//winston
testRouter.get("/winston", winston);
