import { Router } from "express";
import { loggerTest, mocking100Products, winston } from "../../test/product.test.js";
import { postDebug } from "../controllers/debugControllers.js";

export const testRouter = Router();

//GET cart by id
testRouter.get("/mockingproducts", mocking100Products);

//logger
testRouter.get("/logger", loggerTest);

//winston
testRouter.get("/winston", winston);

//test
testRouter.post("/sendApiSic", postDebug);

